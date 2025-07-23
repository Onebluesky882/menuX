import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq } from 'drizzle-orm';
import { CustomerDto } from './customers.dto';
import { customers } from 'src/database';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
  ) {}

  async create(dto: CustomerDto, userId: string) {
    try {
      const inserted = await this.db
        .insert(customers)
        .values({ ...dto, userId: userId })
        .returning();

      return {
        success: true,
        message: 'create customer successfully',
        data: inserted,
      };
    } catch (error) {
      this.logger.error('Failed to create customer', error);
      if (error === '23505') {
        throw new HttpException(
          { success: false, message: 'customer already exists.' },
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        {
          success: false,
          message: 'An error occurred while creating the customer.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll() {
    try {
      const result = await this.db
        .select({
          userId: customers.userId,
          active: customers.active,
          createdAt: customers.createdAt,
          updatedAt: customers.updatedAt,
        })
        .from(customers);
      return {
        success: true,
        message: 'Fetched all orderTable successfully',
        data: result,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'failed fetch customer',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: string) {
    try {
      const result = await this.db
        .select({
          userId: customers.userId,
          active: customers.active,
          createdAt: customers.createdAt,
          updatedAt: customers.updatedAt,
        })
        .from(customers)
        .where(eq(customers.id, id));

      return {
        data: result[0],
        success: true,
        message: 'Fetched customer by ID successfully',
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

  async update(id: string, body: CustomerDto) {
    try {
      const updated = await this.db
        .update(customers)
        .set(body)
        .where(eq(customers.id, id))
        .returning();
      return {
        data: updated,
        success: true,
        message: ' updated customer success ',
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: ' fail to update customer ',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async delete(id: string) {
    try {
      await this.db.delete(customers).where(eq(customers.id, id)).returning();
      return {
        success: true,
        message: 'customer deleted successfully',
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'Fail delete customer',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
