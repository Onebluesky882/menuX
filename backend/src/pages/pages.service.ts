import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { pages, schema, shops } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq, and } from 'drizzle-orm';
import { PageDto } from './pages.dto';

@Injectable()
export class PagesService {
  private readonly logger = new Logger(PagesService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(body: PageDto, shopId: string) {
    try {
      const data = await this.db
        .insert(pages)
        .values({ ...body, shopId })
        .returning();
      return {
        success: true,
        message: 'Page created successfully',
        data: data,
      };
    } catch (error) {
      this.logger.error('Insert failed ', error);
      throw new HttpException(
        {
          success: false,
          message: 'fail to insert new page',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getAll(shopId: string) {
    try {
      const data = await this.db
        .select({
          name: pages.name,
          shopId: pages.shopId,
        })
        .from(pages)
        .where(eq(pages.shopId, shopId));
      return { success: true, message: 'get all success', data: data };
    } catch (error) {
      this.logger.error('allPages failed ', error);
      throw new HttpException(
        { success: false, message: 'Failed to fetch pages' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: string, shopId: string) {
    try {
      const data = await this.db
        .select({
          name: pages.name,
          shopId: pages.shopId,
        })
        .from(pages)
        .where(and(eq(pages.id, id), eq(pages.shopId, shopId)));

      if (data.length === 0) {
        throw new HttpException('Page not found', HttpStatus.NOT_FOUND);
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
          message: 'Failed to fetch page',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, body: PageDto, shopId: string) {
    try {
      const updated = await this.db
        .update(pages)
        .set(body)
        .where(and(eq(pages.id, id), eq(pages.shopId, shopId)))
        .returning();

      if (updated.length === 0) {
        throw new HttpException('Page not found', HttpStatus.NOT_FOUND);
      }
      return {
        success: true,
        message: 'page updated successfully',
        data: updated[0],
      };
    } catch (error) {
      this.logger.error('updated failed ', error);

      throw new HttpException(
        {
          success: false,
          message: 'Failed to update page',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string, shopId: string) {
    try {
      const deleted = await this.db
        .delete(pages)
        .where(and(eq(pages.id, id), eq(pages.shopId, shopId)))
        .returning();

      if (deleted.length === 0) {
        this.logger.warn(
          `Page with ID "${id}" not found or unauthorized for user "${shopId}"`,
        );
        throw new HttpException(
          {
            success: false,
            message:
              'Page not found or you do not have permission to delete it.',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        message: 'Page deleted successfully.',
      };
    } catch (error) {
      this.logger.error('❌ Delete failed', error || error);
      throw new HttpException(
        {
          success: false,
          message: 'Failed to delete page due to a server error.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
