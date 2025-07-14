import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { employers, orderTable, shops } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq } from 'drizzle-orm';

import { EmployersDto } from './employers.dto';

@Injectable()
export class EmployersService {
  private readonly logger = new Logger(EmployersService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
  ) {}

  async create(dto: EmployersDto, shopId: string, userId: string) {
    try {
      const inserted = await this.db
        .insert(employers)
        .values({ ...dto, shopId: shopId, userId: userId })
        .returning();

      return {
        success: true,
        message: 'create employer successfully',
        data: inserted,
      };
    } catch (error) {
      this.logger.error('Failed to create employer', error);
      if (error === '23505') {
        throw new HttpException(
          { success: false, message: 'employer already exists.' },
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        {
          success: false,
          message: 'An error occurred while creating the employer.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll() {
    try {
      const result = await this.db
        .select({
          startDate: employers.startDate,
          userId: employers.userId,
          active: employers.active,
          endDate: employers.endDate,
          shopId: employers.shopId,
        })
        .from(employers);
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
          message: 'failed fetch employer',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: string) {
    try {
      const result = await this.db
        .select({
          startDate: employers.startDate,
          userId: employers.userId,
          active: employers.active,
          endDate: employers.endDate,
          shopId: employers.shopId,
        })
        .from(employers)
        .where(eq(employers.id, id));

      return {
        data: result[0],
        success: true,
        message: 'Fetched employer by ID successfully',
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

  async update(id: string, body: EmployersDto) {
    try {
      const updated = await this.db
        .update(employers)
        .set(body)
        .where(eq(employers.id, id))
        .returning();
      return {
        data: updated,
        success: true,
        message: ' updated employer success ',
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: ' fail to update employer ',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async delete(id: string) {
    try {
      await this.db.delete(employers).where(eq(employers.id, id)).returning();
      return {
        success: true,
        message: 'employer deleted successfully',
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: 'Fail delete employer',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
