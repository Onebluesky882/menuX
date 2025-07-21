import { slipVerifications } from '@/database';
import { InferInsertModel } from 'drizzle-orm';
export type PostSlipDto = {
  amount: string;
  qrcode_data: string;
  orderId?: string;
};

export type PaymentRecode = InferInsertModel<typeof slipVerifications>;
