import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CustomerService } from './customers.service';
import { CustomerController } from './customers.controller';

@Module({
  imports: [DatabaseModule],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomersModule {}
