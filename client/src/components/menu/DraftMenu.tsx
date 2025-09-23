import { Label } from "@radix-ui/react-dropdown-menu";
import { FaCloudArrowUp } from "react-icons/fa6";
import { RiCloseCircleFill } from "react-icons/ri";
import { Input } from "../ui/input";
import UploadImage from "../uploadImage";

export const DraftMenu = ({
  handleRemoveDraft,
  idx,
  menu,
  setUploadingIndex,
  uploadingIndex,
  addImage,
  selectedShop,
  attachImages,
  menuId,
}: {
  handleRemoveDraft: (idx: number) => void;
  idx: number;
  menu: any;
  setUploadingIndex: (idx: number | null) => void;
  uploadingIndex: number | null;
  addImage: (img: any) => void;
  selectedShop: { id: string } | null;
  attachImages: (idx: number, files: File[]) => void;
  menuId: string;
}) => {
  return (
    <div className="relative flex flex-col p-4 rounded-2xl shadow-md border bg-white">
      <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
        <RiCloseCircleFill size={20} onClick={() => handleRemoveDraft(idx)} />
      </button>
      <p className="text-lg font-semibold">{menu.name}</p>
      {menu.options.map((item: any, index: number) => (
        <div key={index}>
          <p>
            {item.label} - {item.price}
          </p>
        </div>
      ))}
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
        onImagesSelected={files => {
          const fileArray = Array.from(files);
          fileArray.forEach(file => {
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
        type="menu"
        menuId={menuId}
        shopId={selectedShop?.id ?? ""}
      />
    </div>
  );
};

export const FormMenuItems = ({ register, errors }: any) => {
  return (
    <div className="md:col-span-2 space-y-2">
      <Label className="text-sm font-medium text-gray-700">Item Name</Label>
      <Input
        {...register("name")}
        placeholder="Enter menu name"
        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
      />
      {errors.name && (
        <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
      )}
      <Input
        {...register("price")}
        placeholder="Enter price"
        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
      />
      {errors.price && (
        <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
      )}
    </div>
  );
};
