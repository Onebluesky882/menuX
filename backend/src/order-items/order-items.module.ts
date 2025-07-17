import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';

@Module({
  imports: [DatabaseModule],
  providers: [OrderItemsService],
  controllers: [OrderItemsController],
})
export class OrderItemsModule {}
