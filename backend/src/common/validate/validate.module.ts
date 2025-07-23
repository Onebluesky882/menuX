import { Module } from '@nestjs/common';
import { ValidateService } from './validate.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ValidateService],
  exports: [ValidateService],
})
export class ValidateModule {}
