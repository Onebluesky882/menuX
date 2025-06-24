// pages/test-upload.tsx

import { useEffect, useState } from "react";
import UploadImage from "@/components/uploadImage";
import useImages from "@/hooks/useImage";
import { v4 as uuidv4 } from "uuid";
const UploadFile = () => {
  const { addImage, upload, images } = useImages();
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const handleUpload = async () => {
    const uploaded = await upload();
  };
  const image = {
    type: "shop",
    menuId: "394aaaf2-2ef4-464e-9b60-6388c958be35",
    shopId: "150d9c0c-6b45-4e58-a8fe-52e7ebe6faf2",
  };
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Test Image Upload</h1>

      <UploadImage
        onImagesSelected={(files) => {
          Array.from(files).forEach((file) => {
            const url = URL.createObjectURL(file);
            addImage({
              previewUrl: url,
              status: "idle",
              type: image.type,
              menuId: image.menuId,
              shopId: image.shopId,
            });
          });
        }}
        onDialogClosed={() => setUploadingIndex(null)}
        trigger={uploadingIndex !== null}
        type={image.type}
        menuId={image.menuId}
        shopId={image.shopId}
      />

      <div className="mt-4 space-x-2">
        <button
          onClick={() => setUploadingIndex(0)} // trigger UploadImage input
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Select Images
        </button>
        <button
          onClick={handleUpload}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </div>

      {/* Display images in store */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative border rounded-md overflow-hidden">
            <img
              src={img.previewUrl}
              alt="preview"
              className="object-cover w-full h-24"
            />
            <div className="absolute bottom-0 left-0 right-0 text-xs text-white bg-black/50 text-center">
              {img.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadFile;
