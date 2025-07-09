import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, type QuickAddMenu } from "@/schema/addMenuSchema";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiCloseCircleFill } from "react-icons/ri";
import { FaCloudArrowUp } from "react-icons/fa6";
import { toast } from "sonner";

import { menuApi } from "@/Api/menu.api";
import { uploadImageApi } from "@/Api/uploadImage.api";
import useShop from "@/hooks/useShop";
import useImages from "@/hooks/useImage";
import { transformKeysToSnakeCase } from "@/utils/string";
import UploadImage from "@/components/uploadImage";
import { cn } from "@/lib/utils";
import { compressAndUpload } from "@/utils/imageCompression";
import { v4 as uuidv4 } from "uuid";
type Draft = {
  menu: QuickAddMenu;
  imageFiles?: File[];
};

export default function MenuManagement() {
  const menuId = uuidv4();
  /* ---------------- state --------------- */

  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const { selectedShop } = useShop();
  const { addImage } = useImages();

  const [addOptions, setAddOptions] = useState();

  /* ------------ react-hook-form ---------- */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuickAddMenu>({ resolver: zodResolver(schema) });

  /* ---------- form handlers -------------- */
  const onSubmit = (data: QuickAddMenu) => {
    setDrafts((prev) => [...prev, { menu: data, imageFiles: [] }]);
    toast.success("Draft menu added");
    reset();
  };

  const attachImages = (index: number, files: File[]) =>
    setDrafts((prev) =>
      prev.map((d, i) =>
        i === index
          ? { ...d, imageFiles: [...(d.imageFiles ?? []), ...files] }
          : d
      )
    );

  /* ------------- save all --------------- */
  const saveAll = async () => {
    if (!selectedShop) return toast.error("Please select a shop first");
    const shopId = selectedShop.id;
    setLoading(true);

    try {
      /* 1️⃣  create menus in parallel */
      const createResults = await Promise.allSettled(
        drafts.map(({ menu }) => {
          const menuId = uuidv4(); // ⚠️ make sure this is scoped correctly per draft
          return menuApi
            .create({
              id: menuId,
              ...transformKeysToSnakeCase(menu),
              shopId,
            })
            .then((res) => ({ id: menuId, result: res }));
        })
      );

      /* 2️⃣  for each draft: fetch menuId then upload ALL image files */
      for (let i = 0; i < drafts.length; i++) {
        const { imageFiles } = drafts[i];

        if (!imageFiles || imageFiles.length === 0) continue;
        const createResult = createResults[i];
        if (createResult.status !== "fulfilled") continue;

        const menuId = createResult.value.id;

        // Upload all images for this menu
        await Promise.all(
          imageFiles.map((file) => {
            const previewUrl = URL.createObjectURL(file);

            return compressAndUpload(
              previewUrl,
              (fd: FormData) =>
                uploadImageApi.create(fd).then((r) => r.data.url),
              { type: "menu", shopId, menuId }
            );
          })
        );
      }

      toast.success("Menus and images saved!");
      setDrafts([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save some items");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveDraft = (idx: number) => {
    setDrafts((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-2">Menu &amp; Promotions</h1>
      <p className="text-gray-600 mb-6">
        Manage your restaurant menu items and special promotions
      </p>

      <Tabs defaultValue="menu">
        <TabsList className="mb-6">
          <TabsTrigger value="menu">Regular Menu</TabsTrigger>
          <TabsTrigger value="desserts">Dessert</TabsTrigger>
          <TabsTrigger value="drinks">Drink</TabsTrigger>
          <TabsTrigger value="promotions">Special</TabsTrigger>
        </TabsList>

        {/* ---------- DRAFT CARDS + UPLOAD ---------- */}
        {drafts.length > 0 && (
          <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {drafts.map(({ menu }, idx) => (
                <div
                  key={idx}
                  className="relative flex flex-col p-4 rounded-2xl shadow-md border bg-white"
                >
                  <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                    <RiCloseCircleFill
                      size={20}
                      onClick={() => handleRemoveDraft(idx)}
                    />
                  </button>
                  <p className="text-lg font-semibold">{menu.name}</p>
                  <p className="text-sm text-gray-500">{menu.price} ฿</p>
                  <button
                    onClick={() => setUploadingIndex(idx)}
                    className="mt-4 flex items-center gap-1 text-blue-600"
                  >
                    <FaCloudArrowUp size={18} />
                    <span className="text-sm">Upload</span>
                  </button>
                  <UploadImage
                    trigger={uploadingIndex === idx}
                    onDialogClosed={() => setUploadingIndex(null)}
                    onImagesSelected={(files) => {
                      const fileArray = Array.from(files);
                      fileArray.forEach((file) => {
                        addImage({
                          previewUrl: URL.createObjectURL(file),
                          status: "idle",
                          type: "menu",
                          shopId: selectedShop?.id ?? "",
                          menuId: menuId,
                        });
                      });

                      attachImages(idx, fileArray);
                    }}
                    type={"menu"}
                    menuId={""}
                    shopId={""}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button
                disabled={loading}
                onClick={saveAll}
                className={cn(
                  "px-6 py-2 rounded-full shadow text-white",
                  loading
                    ? "bg-blue-600/40 cursor-wait"
                    : "bg-blue-600 hover:bg-blue-700"
                )}
              >
                {loading ? "Saving…" : "Save All"}
              </Button>
            </div>
          </div>
        )}

        {/* ---------- FORM TAB ---------- */}
        <TabsContent value="menu">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Menu Item</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <div className="md:col-span-2">
                  <Label>Item Name</Label>
                  <Input {...register("name")} placeholder="Enter menu name" />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                {/* todo add input select option later */}
                <div>
                  <Label>Price (฿)</Label>
                  <Input
                    type="number"
                    {...register("price", { valueAsNumber: true })}
                    placeholder="0"
                  />
                  {errors.price && (
                    <p className="text-sm text-red-500">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div className="flex items-end">
                  <Button
                    disabled={!selectedShop}
                    type="submit"
                    className={cn(
                      "bg-blue-600 text-white hover:bg-blue-700",
                      !selectedShop && "bg-blue-300 cursor-not-allowed"
                    )}
                  >
                    Add Menu
                  </Button>
                </div>

                {/* Add New Option */}
                {<button onClick={() => {}}>add option</button>}
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export type AddMenuOptionProps = {
  value: any;
  onChange: (e: any) => void;
};

export const AddOptions = ({ value, onChange }: AddMenuOptionProps) => {
  return (
    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <Label className="text-xs text-gray-600">Quantity</Label>
        <Input
          type="number"
          placeholder="3"
          value={value}
          onChange={(e: any) => onChange(e)}
        />
      </div>
    </div>
  );
};
