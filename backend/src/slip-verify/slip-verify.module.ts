import { Module } from '@nestjs/common';
import { SlipVerifyController } from './slip-verify.controller';
import { SlipVerifyService } from './slip-verify.service';
import { DatabaseModule } from '@/database/database.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [SlipVerifyController],
  providers: [SlipVerifyService],
})
export class SlipVerifyModule {}
