"use client";

import QrCodeRender from "@/components/QrCodeRender";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { ordersApi } from "../api/orders.api";
import { GroupedData, RawOrderItem } from "../types/menuOrder.type";
import { checkSlipApi, SlipVerify } from "../api/checkSlip.api";
import CameraCapture from "@/components/CameraCapture";
import { Button } from "@/components/ui/button";

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

  useEffect(() => {
    const verifySlip = async () => {
      if (qrcode.length === 0) return;
      const prepareData: SlipVerify = {
        amount: String(totalPrice),
        qrcode_data: qrcode[0].qrcode_data,
        orderId: orderId,
      };

      console.log("prepareData", prepareData);
      const res = await checkSlipApi.postSlip(prepareData);
      console.log("res", res);
      console.log("res.data", res.data);

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

  console.log("slipValidate ", slipValidate);

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

      <div className="bg-gray-50 p-5 rounded-xl border">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          แนบสลิปโอนเงิน
        </h2>
        <div className="outline-1">
          <QrCodeRender />
        </div>
        หรือ
        <div>
          <Button onClick={handleCamera}>แสกนอัตโนมัติ</Button>

          {openCamera && <CameraCapture onScan={handleScan} />}
        </div>
        <div className="wrap-break-word">
          {qrcode.length > 0 &&
            qrcode.map((item) => (
              <span key={item.qrcode_data}> {item.qrcode_data}</span>
            ))}
        </div>
        <pre>{JSON.stringify(slipValidate, null, 2)}</pre>
      </div>
    </div>
  );
};

export default OrderSummary;
