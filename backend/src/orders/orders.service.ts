import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { shops, orders, orderItems } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq, and } from 'drizzle-orm';
import { OrderGateway } from 'src/gateways/order.gateway';
import type { CreateOrderDto, InsertOrders } from './orders.dto';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
    private readonly orderGateway: OrderGateway,
  ) {}

  async create(data: CreateOrderDto) {
    const { shopId, items } = data;

    const order = await this.db
      .insert(orders)
      .values({ shopId })
      .returning()
      .then((val) => val[0]);

    const orderItemsToInsert = items.map((item) => ({
      orderId: order.id,
      menuId: item.menuId,
      quantity: item.quantity,
      priceEach: item.priceEach,
      totalPrice: item.totalPrice,
      status: item.status || null,
    }));
    await this.db.insert(orderItems).values(orderItemsToInsert);
    return {
      success: true,
      data: order,
    };
  }

  async getAll(shopId: string) {
    try {
      const result = await this.db
        .select({
          status: orders.status,
          orderTableId: orders.orderTableId,
          createdAt: orders.createdAt,
          createdById: orders.createdById,
          updatedAt: orders.updatedAt,
          shopId: orders.shopId,
          customerId: orders.customerId,
          quantity: orders.quantity,
          priceEach: orders.priceEach,
          totalPrice: orders.totalPrice,
        })
        .from(orders)
        .where(eq(orders.shopId, shopId));

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'failed fetch order',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: string, shopId: string) {
    try {
      const found = await this.db
        .select({
          status: orders.status,
          orderTableId: orders.orderTableId,
          createdAt: orders.createdAt,
          createdById: orders.createdById,
          updatedAt: orders.updatedAt,
          shopId: orders.shopId,
          customerId: orders.customerId,
          quantity: orders.quantity,
          priceEach: orders.priceEach,
          totalPrice: orders.totalPrice,
        })
        .from(orders)
        .innerJoin(shops, eq(orders.shopId, shops.id))
        .where(and(eq(orders.id, id), eq(shops.id, shopId)));

      if (found.length === 0) {
        throw new HttpException(
          'You do not have permission to access this order.',
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        data: found[0],
        success: true,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'unable to fetch by id',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, body: InsertOrders, shopId: string) {
    try {
      const updated = await this.db
        .update(orders)
        .set(body)
        .where(and(eq(orders.id, id), eq(orders.shopId, shopId)))
        .returning();

      const updateOrder = updated[0];
      this.orderGateway.notifyOrderUpdate(updateOrder, shopId);
      return {
        data: updated,
        success: true,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: ' fail to update order ',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async delete(id: string, shopId: string) {
    try {
      await this.db
        .delete(orders)
        .where(and(eq(orders.id, id), eq(orders.shopId, shopId)));

      return {
        success: true,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'Fail delete order',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
