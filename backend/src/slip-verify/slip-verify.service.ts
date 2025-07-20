import { DATABASE_CONNECTION } from '@/database/database-connection';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PaymentRecode, PostSlipDto } from './slipVerify.dto';
import { slipVerify } from '@/database';

@Injectable()
export class SlipVerifyService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
    private readonly http: HttpService,
  ) {}

  async postCodeToVerify({ amount, qrcode_data, orderId }: PostSlipDto) {
    const url = `https://ucwgwgkko4wk408ggsk0cosw.oiio.download/api/slip/${amount}/no_slip`;

    try {
      const res = await firstValueFrom(this.http.post(url, { qrcode_data }));
      const slipData = res.data.data;

      const insertData = await this.db.insert(slipVerify).values({
        slipCode: qrcode_data,
        ref: slipData.ref,
        senderBank: slipData.sender_bank,
        senderName: slipData.sender_name,
        senderId: slipData.sender_id,
        receiverBank: slipData.receiver_bank,
        receiverName: slipData.receiver_name,
        receiverId: slipData.receiver_id,
        amount: slipData.amount,
        orderId: orderId,
        status: true,
      });
      console.log('result', insertData);
      return {
        success: true,
        data: insertData,
      };
    } catch (error: any) {
      console.error(
        '❌ External API Error:',
        error.response?.data || error.message,
      );
      throw new HttpException(
        {
          message: 'ตรวจสอบ slip ล้มเหลว',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

// 3 party https://ucwgwgkko4wk408ggsk0cosw.oiio.download/api/slip/:amount/no_slip

/* 
{
  "qrcode_data": "0045000600000101030300224519913739581I000002B97905102TH91041628"
} */
