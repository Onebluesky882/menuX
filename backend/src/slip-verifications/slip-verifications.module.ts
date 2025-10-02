import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SlipVerificationsController } from './slip-verifications.controller';
import { SlipVerificationsService } from './slip-verifications.service';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [SlipVerificationsController],
  providers: [SlipVerificationsService],
})
export class SlipVerificationsModule {}
