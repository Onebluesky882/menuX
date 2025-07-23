import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { categories, schema, shops } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq, and } from 'drizzle-orm';
import { CategoryDto } from './categories.dto';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(body: CategoryDto) {
    try {
      const data = await this.db.insert(categories).values(body).returning();
      return {
        success: true,
        message: 'Category created successfully',
        data: data,
      };
    } catch (error) {
      this.logger.error('Insert failed ', error);
      throw new HttpException(
        {
          success: false,
          message: 'fail to insert new category',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getAll() {
    try {
      const data = await this.db
        .select({
          name: categories.name,
        })
        .from(categories);

      return { success: true, message: 'get all success', data: data };
    } catch (error) {
      this.logger.error('all categories failed ', error);
      throw new HttpException(
        { success: false, message: 'Failed to fetch categories' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getById(id: string) {
    try {
      const data = await this.db
        .select({ name: categories.name })
        .from(categories)
        .where(eq(categories.id, id));

      if (data.length === 0) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      return {
        success: true,
        message: 'get by id success',
        data: data[0],
      };
    } catch (error) {
      this.logger.error('Fetch failed', error);
      throw new HttpException(
        {
          success: false,
          message: 'Failed to fetch category',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getByName(name: string) {
    try {
      const data = await this.db
        .select({ name: categories.name })
        .from(categories)
        .where(eq(categories.name, name));

      if (data.length === 0) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      return {
        success: true,
        message: 'get by id success',
        data: data[0],
      };
    } catch (error) {
      this.logger.error('Fetch failed', error);
      throw new HttpException(
        {
          success: false,
          message: 'Failed to fetch category',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, body: CategoryDto) {
    try {
      const updated = await this.db
        .update(categories)
        .set(body)
        .where(and(eq(categories.id, id)))
        .returning();

      if (updated.length === 0) {
        throw new HttpException('Page not found', HttpStatus.NOT_FOUND);
      }
      return {
        success: true,
        message: 'Category updated successfully',
        data: updated,
      };
    } catch (error) {
      this.logger.error('updated failed ', error);
      throw new HttpException(
        {
          success: false,
          message: 'Failed to update category',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string) {
    try {
      const deleted = await this.db
        .delete(categories)
        .where(eq(categories.id, id))
        .returning();

      if (deleted.length === 0) {
        throw new HttpException({}, HttpStatus.NOT_FOUND);
      }
      return {
        success: true,
        message: 'deleted',
      };
    } catch (error) {
      this.logger.error('❌ Delete failed', error);
      throw new HttpException(
        {
          success: false,
          message: 'Failed to delete',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
