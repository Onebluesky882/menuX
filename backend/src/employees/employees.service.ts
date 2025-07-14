import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { employees } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq } from 'drizzle-orm';
import { EmployeesDto } from './employees.dto';

@Injectable()
export class EmployeesService {
  private readonly logger = new Logger(EmployeesService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
  ) {}

  async create(dto: EmployeesDto, shopId: string, userId: string) {
    try {
      const inserted = await this.db
        .insert(employees)
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
          startDate: employees.startDate,
          userId: employees.userId,
          active: employees.active,
          endDate: employees.endDate,
          shopId: employees.shopId,
        })
        .from(employees);
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
          startDate: employees.startDate,
          userId: employees.userId,
          active: employees.active,
          endDate: employees.endDate,
          shopId: employees.shopId,
        })
        .from(employees)
        .where(eq(employees.id, id));

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

  async update(id: string, body: EmployeesDto) {
    try {
      const updated = await this.db
        .update(employees)
        .set(body)
        .where(eq(employees.id, id))
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
      await this.db.delete(employees).where(eq(employees.id, id)).returning();
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
