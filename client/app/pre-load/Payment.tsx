"use client";

import QrCodeRender from "@/components/QrCodeRender";
import Image from "next/image";

const Payment = () => {
  return (
    <div>
      <div>
        scan qrcode
        <Image src={"/IMG_2077.JPG"} alt={"qrcode"} width={300} height={500} />
      </div>

      <div>
        <QrCodeRender />
      </div>
    </div>
  );
};
export default Payment;
