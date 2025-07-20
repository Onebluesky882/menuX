"use client";

import QrCodeRender from "@/components/QrCodeRender";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { ordersApi } from "../api/orders.api";
import { GroupedData, RawOrderItem } from "../types/menuOrder.type";
import { checkSlipApi, SlipVerify } from "../api/slip-verifications.api";
import CameraCapture from "@/components/CameraCapture";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import * as z from "zod";
type SlipInform = {
  qrcode_data: string;
  amount: number;
  orderId: string;
};
const OrderSummary = ({ orderId }: { orderId: string }) => {
  const [orders, setOrders] = useState<RawOrderItem[]>([]);

  const [qrcode, setQrcode] = useState<SlipVerify[]>([]);
  const [slipValidate, setSlipValidate] = useState<SlipVerify | null>(null);

  const totalPrice = useMemo(() => {
    return orders?.reduce(
      (sum, i) => sum + Number(i.quantity) * Number(i.priceEach),
      0
    );
  }, [orders]);

  const schema = z.object({
    qrcode_data: z.string(),
    amount: z.string(),
    orderId: z.string(),
  });

  useEffect(() => {
    const verifySlip = async () => {
      if (qrcode.length === 0) return;
      const prepareData: SlipVerify = {
        amount: String(totalPrice),
        qrcode_data: qrcode[0].qrcode_data,
        orderId: orderId,
      };
      const parsed = schema.safeParse(prepareData);

      if (!parsed.success) {
        console.error("❌ Schema validation failed:", parsed.error);
        return;
      }

      const validData = parsed.data;
      const res = await checkSlipApi.postSlip(validData);
      setSlipValidate(res.data);
    };
    verifySlip();
    // -------------
    const handleGetOrder = async () => {
      const res = await ordersApi.getOrderById(orderId);
      setOrders(res.data.data);
    };
    handleGetOrder();
  }, [orderId, qrcode, totalPrice]);

  const grouped = useMemo(() => {
    const result: GroupedData = {};
    orders?.forEach((item) => {
      const menu = item.menuName;
      const price = parseFloat(item.priceEach).toFixed(2);
      const qty = parseFloat(item.quantity);
      const label = item.optionLabel;

      if (!result[menu]) result[menu] = {};
      if (!result[menu][price]) {
        result[menu][price] = {
          totalQuantity: qty,
          optionLabel: label,
          totalPrice: qty * parseFloat(price),
        };
      } else {
        result[menu][price].totalQuantity += qty;
        result[menu][price].totalPrice += qty * parseFloat(price);
      }
    });
    return result;
  }, [orders]);
  const [openCamera, setOpenCamera] = useState(false);
  const handleCamera = () => {
    setOpenCamera((prev) => !prev);
  };

  const handleScan = (qrcode_data: string) => {
    const data: SlipVerify = {
      amount: totalPrice.toString(),
      qrcode_data,
      orderId,
    };
    setQrcode([data]);
    setOpenCamera(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg border text-gray-800 space-y-6 text-xl font-medium leading-relaxed">
      {/* Header / ร้าน */}
      <div className="text-center border-b pb-4">
        <h1 className="text-4xl font-bold tracking-wide text-blue-600">
          MenuX
        </h1>
        <p className="text-xl">ใบสรุปรายการอาหาร</p>
        <p className="text-gray-600 mt-1 text-base">Order ID: {orderId}</p>
      </div>

      {/* รายการอาหาร */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          รายการอาหาร
        </h2>
        {Object.entries(grouped).map(([menuName, prices], index) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold text-xl text-gray-700 mb-1">{menuName}</h3>
            <ul className="ml-4 space-y-1 text-lg">
              {Object.entries(prices).map(([price, summary], i) => (
                <li key={i} className="flex justify-between py-1">
                  <span>
                    {summary.optionLabel} × {summary.totalQuantity}
                  </span>
                  <span>{summary.totalPrice.toFixed(2)} ฿</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="border-t pt-4 mt-4 text-right text-2xl font-bold">
          รวมทั้งสิ้น: <span className="text-green-600">{totalPrice} ฿</span>
        </div>
      </div>

      {/* Qr Code */}
      {!openCamera && (
        <div className="text-center bg-gray-50 rounded-xl p-5 border">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            แสกนเพื่อชำระเงิน
          </h2>

          <p className="text-xl text-gray-700 mb-2">
            บัญชี: <strong>mademyday วันของฉัน</strong>
          </p>
          <Image
            src="/IMG_2043.PNG"
            alt="QR Code"
            width={200}
            height={200}
            className="mx-auto rounded-md border"
          />
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 max-w-xl mx-auto">
        {!openCamera && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              แนบสลิปโอนเงิน
            </h2>
            <div className="border border-dashed gap-2  border-gray-300 rounded-xl p-4 flex justify-center items-center mb-4 bg-gray-50">
              <QrCodeRender />
              <span className="text-[14px] text-gray-500">อัพโหลดสลิป</span>
            </div>
            <div className="flex items-center justify-center mb-4 text-sm text-gray-500">
              <span className="px-2">หรือ</span>
            </div>
          </div>
        )}
        <div className="flex flex-col items-center gap-3 mb-4">
          <div className="relative">
            <Button
              onClick={handleCamera}
              className="z-100 bg-blue-600 text-white hover:bg-blue-700"
            >
              {openCamera ? "ปิดกล้อง" : "แสกนอัตโนมัติ"}
            </Button>
            {!openCamera && <TouchClick />}
          </div>
          {!openCamera && <QrcodeLiveScan />}
          {openCamera && (
            <div className="w-full max-w-sm border rounded-lg overflow-hidden">
              <CameraCapture onScan={handleScan} />
            </div>
          )}
        </div>
        {qrcode.some((item) => item.qrcode_data?.trim()) && (
          <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-800 break-words">
            <h3 className="font-medium mb-1">QR Code slip:</h3>
            <span className="list-disc pl-5">
              {qrcode.map((item) => (
                <span key={item.qrcode_data}>{item.qrcode_data}</span>
              ))}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const QrcodeLiveScan = () => {
  return (
    <DotLottieReact
      src="https://lottie.host/76c4f205-5ae1-48fd-a504-d51f110592cc/GzxFhOpzz0.lottie"
      loop
      autoplay
    />
  );
};

const TouchClick = () => {
  return (
    <div className="absolute top-1  pointer-events-none">
      <DotLottieReact
        src="https://lottie.host/8dd2e49c-dd12-474d-bd58-3f7cc5f543a6/bXV1RnSf8W.lottie"
        loop
        autoplay
        color="white"
      />
    </div>
  );
};
export default OrderSummary;
