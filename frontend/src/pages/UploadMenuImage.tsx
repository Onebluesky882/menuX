// pages/test-upload.tsx

import { useState } from "react";
import UploadImage from "@/components/uploadMenuImage";
import useImages from "@/hooks/useImage";
const UploadFile = () => {
  const { addImage, images, upload } = useImages();
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const image = {
    type: "shop",
    menuId: "422a91d8-a4cb-423b-a308-30fc55fb5b8b",
    shopId: "150d9c0c-6b45-4e58-a8fe-52e7ebe6faf2",
  };
  const handleUpload = async () => {
    await upload();
    alert("upload !");
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
              shopId: image.shopId,
            });
          });
        }}
        onDialogClosed={() => setUploadingIndex(null)}
        trigger={uploadingIndex !== null}
        type={image.type}
        shopId={image.shopId}
        menuId={image.menuId}
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
