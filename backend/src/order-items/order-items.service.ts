import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { OrderDtoItems } from './order-items.dto';
import { orderItems } from 'src/database';

@Injectable()
export class OrderItemsService {
  private readonly logger = new Logger(OrderItemsService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
  ) {}

  async create(newOrderItems: OrderDtoItems) {
    try {
      const inserted = await this.db
        .insert(orderItems)
        .values(newOrderItems)
        .returning();
      return {
        success: true,
        data: inserted,
      };
    } catch (error) {
      this.logger.error('Failed to create ', error);
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const err = error as { code: string };

        if (err.code === '23505') {
          throw new HttpException(
            { success: false, message: 'order already exists.' },
            HttpStatus.CONFLICT,
          );
        }
      }

      throw new HttpException(
        {
          success: false,
          message: 'An error occurred while creating the order.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll() {
    try {
      const result = await this.db
        .select({
          totalPrice: orderItems.totalPrice,
          quantity: orderItems.quantity,
          priceEach: orderItems.priceEach,
          orderId: orderItems.orderId,
          menuId: orderItems.menuId,
        })
        .from(orderItems);

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

  async getById(id: string) {
    try {
      const found = await this.db
        .select({
          totalPrice: orderItems.totalPrice,
          quantity: orderItems.quantity,
          priceEach: orderItems.priceEach,
          orderId: orderItems.orderId,
          menuId: orderItems.menuId,
        })
        .from(orderItems);

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

  async update(id: string, body: OrderDtoItems) {
    try {
      const updated = await this.db.update(orderItems).set(body).returning();
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
  async delete(id: string) {
    try {
      await this.db.delete(orderItems);

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
