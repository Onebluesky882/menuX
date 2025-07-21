import { DATABASE_CONNECTION } from '@/database/database-connection';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { firstValueFrom } from 'rxjs';
import { PostSlipDto } from './slip-verifications.dto';
import { slipVerifications } from '@/database';
import { DatabaseError } from 'pg';
@Injectable()
export class SlipVerificationsService {
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

      const insertData = await this.db.insert(slipVerifications).values({
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
      throw new HttpException(
        {
          success: false,
          message: 'transaction unsuccess!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
