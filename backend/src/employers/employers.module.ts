import { Module } from '@nestjs/common';
import { EmployersController } from './employers.controller';
import { DatabaseModule } from 'src/database/database.module';
import { EmployersService } from './employers.service';
import { ValidateModule } from 'src/common/validate/validate.module';

@Module({
  imports: [DatabaseModule, ValidateModule],
  providers: [EmployersService],
  controllers: [EmployersController],
})
export class EmployersModule {}
