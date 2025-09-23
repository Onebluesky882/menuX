import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

import { DraftMenu, FormMenuItems } from "@/components/menu/DraftMenu";
import {
  AddMenuOptions,
  MenuOptionField,
  SaveAll,
} from "@/components/menu/MenuOptionField";
import useImages from "@/hooks/useImage";
import useMenuManagement from "@/hooks/useMenuManagement";
import useShop from "@/hooks/useShop";
import { schema, type QuickAddMenu } from "@/schema/addMenuSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function MenuManagement() {
  const {
    attachImages,
    drafts,
    handleRemoveDraft,
    setDrafts,
    setUploadingIndex,
    uploadingIndex,
    saveAllMenu,
  } = useMenuManagement();
  /* ------------ react-hook-form ---------- */
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuickAddMenu>({ resolver: zodResolver(schema) });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const [loading, setLoading] = useState(false);
  const { selectedShop } = useShop();
  const { addImage } = useImages();

  /* ---------- form handlers -------------- */
  const onSubmit = (data: QuickAddMenu) => {
    setDrafts(prev => [...prev, { menu: { ...data }, imageFiles: [] }]);
    toast.success("Draft menu added");

    reset();
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-2">Menu & Promotions</h1>
      <p className="text-gray-600 mb-6">
        Manage your restaurant menu items and special promotions
      </p>

      <Tabs defaultValue="menu">
        <TabsList className="mb-6">
          <TabsTrigger value="menu">Regular Menu</TabsTrigger>
        </TabsList>

        {/* ---------- DRAFT CARDS + UPLOAD ---------- */}
        {drafts.length > 0 && (
          <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {drafts.map(({ menu }, idx) => (
                <DraftMenu
                  key={idx}
                  idx={idx}
                  menu={menu}
                  handleRemoveDraft={handleRemoveDraft}
                  setUploadingIndex={setUploadingIndex}
                  uploadingIndex={uploadingIndex}
                  addImage={addImage}
                  selectedShop={selectedShop}
                  attachImages={attachImages}
                  menuId={menu.id ?? ""}
                />
              ))}
            </div>
            <SaveAll
              loading={loading}
              saveAll={() => saveAllMenu({ selectedShop, setLoading })}
            />
          </div>
        )}

        {/* ---------- FORM TAB ---------- */}
        <TabsContent value="menu">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Menu Item</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <FormMenuItems register={register} errors={errors} />

                <MenuOptionField
                  fields={fields}
                  register={register}
                  remove={remove}
                />
                <AddMenuOptions
                  append={append}
                  selectedShop={selectedShop}
                  errors={errors}
                />
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
