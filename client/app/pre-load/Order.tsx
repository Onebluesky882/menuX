"use client";

import QrCodeRender from "@/components/QrCodeRender";
import Image from "next/image";

/* 
see cart order price 

waiting input image for get code from image slip 
 - 
post code to backend checking 
- 
wanting response 
- price match ? 
- time slip after order ? 
- 
*/

const Order = ({ orderId }: { orderId: string }) => {
  return (
    <div>
      <div>
        รายการอาหารของฉัน
        <div></div>
      </div>
      แสกน qrcode เพื่อชำระสินค้า บัญขี : mademyday วันของฉัน
      <div>
        <Image src={"/IMG_2043.PNG"} alt={"qrcode"} width={300} height={500} />
      </div>
      <div>
        แนบสลิปการโอนเงิน
        <QrCodeRender />
      </div>
    </div>
  );
};
export default Order;
