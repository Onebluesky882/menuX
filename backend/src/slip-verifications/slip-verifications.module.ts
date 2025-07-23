import { Module } from '@nestjs/common';
import { SlipVerificationsController } from './slip-verifications.controller';
import { DatabaseModule } from '@/database/database.module';
import { HttpModule } from '@nestjs/axios';
import { SlipVerificationsService } from './slip-verifications.service';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [SlipVerificationsController],
  providers: [SlipVerificationsService],
})
export class SlipVerificationsModule {}
