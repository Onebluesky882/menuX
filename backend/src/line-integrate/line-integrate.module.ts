import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LineIntegrateController } from './line-integrate.controller';
import { LineIntegrateService } from './line-integrate.service';

@Module({
  imports: [DatabaseModule],
  providers: [LineIntegrateService],
  controllers: [LineIntegrateController],
})
export class LineIntegrateModule {}
