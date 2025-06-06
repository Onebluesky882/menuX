import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ShopAccessGuard } from 'src/common/guards/shop-access.guard';
import { ShopsService } from 'src/shops/shops.service';
import { DatabaseModule } from 'src/database/database.module';
import { ValidateModule } from 'src/common/validate/validate.module';
import { OrdersService } from './orders.service';
import { GatewaysModule } from 'src/gateways/gateways.module';

@Module({
  imports: [DatabaseModule, ValidateModule, GatewaysModule],
  providers: [ShopAccessGuard, OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
