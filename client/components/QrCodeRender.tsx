"use client";

import { decodeQR } from "@/lib/scanQrcode";
import { useState } from "react";

const QrCodeRender = () => {
  const [numQrCode, setNumQrCode] = useState<string | null>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];

    if (!file) return;
    const code = await decodeQR(file);
    setNumQrCode(code);
  };
  //   decodeQR();
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {numQrCode && <p>decode qr code : {numQrCode}</p>}
    </div>
  );
};

export default QrCodeRender;
