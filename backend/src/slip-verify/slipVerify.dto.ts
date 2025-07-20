import { slipVerify } from '@/database';
import { IsString } from 'class-validator';
import { InferInsertModel } from 'drizzle-orm';
export type PostSlipDto = {
  amount: string;
  qrcode_data: string;
  orderId: string;
};

export type PaymentRecode = InferInsertModel<typeof slipVerify>;
