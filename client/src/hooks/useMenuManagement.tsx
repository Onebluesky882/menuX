import { useState } from "react";
import { toast } from "sonner";
import { menuApi, menuOptionApi } from "../Api/menu.api";
import { uploadImageApi } from "../Api/uploadImage.api";
import { type QuickAddMenu } from "../schema/addMenuSchema";
import { compressAndUpload } from "../utils/imageCompression";
import { transformKeysToSnakeCase } from "../utils/string";
const useMenuManagement = () => {
  // todo
  const [drafts, setDrafts] = useState<
    { menu: QuickAddMenu; imageFiles?: File[] }[]
  >([]);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const attachImages = (index: number, files: File[]) =>
    setDrafts(prev =>
      prev.map((d, i) =>
        i === index
          ? { ...d, imageFiles: [...(d.imageFiles ?? []), ...files] }
          : d
      )
    );

  const handleRemoveDraft = (idx: number) => {
    setDrafts(prev => prev.filter((_, i) => i !== idx));
  };

  /* ------------- save all --------------- */

  type SaveAllProps = {
    selectedShop: { id: string } | null;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  };

  const saveAllMenu = async ({ selectedShop, setLoading }: SaveAllProps) => {
    if (!selectedShop) return toast.error("Please select a shop first");
    const shopId = selectedShop.id;
    setLoading(true);

    try {
      /* 1️⃣  create menus in parallel */
      const createResults = await Promise.allSettled(
        drafts.map(({ menu }) => {
          return menuApi
            .create({
              ...transformKeysToSnakeCase(menu),
              shopId,
            })
            .then(res => ({ id: menuId, result: res, menu }));
        })
      );
      // 2️⃣ create menu options
      for (let i = 0; i < drafts.length; i++) {
        const createResult = createResults[i];
        if (createResult.status !== "fulfilled") continue;

        const { menu } = drafts[i];
        const menuId = createResult.value.id;

        if (menu.options && menu.options.length > 0) {
          await Promise.allSettled(
            menu.options.map(option => {
              menuOptionApi.create({
                ...transformKeysToSnakeCase(option),
                menuId,
              });
            })
          );
        }
      }

      // 3️⃣ upload images
      for (let i = 0; i < drafts.length; i++) {
        const { imageFiles } = drafts[i];

        if (!imageFiles || imageFiles.length === 0) continue;
        const createResult = createResults[i];
        if (createResult.status !== "fulfilled") continue;

        const menuId = createResult.value.id;

        // Upload all images for this menu
        await Promise.all(
          imageFiles.map(file => {
            const previewUrl = URL.createObjectURL(file);

            return compressAndUpload(
              previewUrl,
              (fd: FormData) => uploadImageApi.create(fd).then(r => r.data.url),
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
  return {
    attachImages,
    handleRemoveDraft,
    setDrafts,
    drafts,
    setUploadingIndex,
    uploadingIndex,
    saveAllMenu,
  };
};
export default useMenuManagement;
