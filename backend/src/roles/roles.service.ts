import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { roles, schema } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq } from 'drizzle-orm';
import { RolesDto } from './roles.dto';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(body: RolesDto) {
    try {
      const data = await this.db.insert(roles).values(body).returning();
      return {
        success: true,
        message: 'Roles created successfully',
        data: data,
      };
    } catch (error) {
      this.logger.error('Insert failed ', error);
      throw new HttpException(
        {
          success: false,
          message: 'fail to insert new Roles',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getAll(shopId: string) {
    try {
      const data = await this.db
        .select({
          name: roles.name,
          shopId: roles.shopId,
        })
        .from(roles)
        .where(eq(roles.shopId, shopId));
      return { success: true, message: 'get all success', data: data };
    } catch (error) {
      this.logger.error('allPages failed ', error);
      throw new HttpException(
        { success: false, message: 'Failed to fetch roles' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: string) {
    try {
      const data = await this.db
        .select({
          name: roles.name,
          shopId: roles.shopId,
        })
        .from(roles)
        .where(eq(roles.id, id));

      if (data.length === 0) {
        throw new HttpException('Roles not found', HttpStatus.NOT_FOUND);
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
          message: 'Failed to fetch Roles',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, body: RolesDto) {
    try {
      const updated = await this.db
        .update(roles)
        .set(body)
        .where(eq(roles.id, id))
        .returning();

      if (updated.length === 0) {
        throw new HttpException('Roles not found', HttpStatus.NOT_FOUND);
      }
      return {
        success: true,
        message: 'Roles updated successfully',
        data: updated[0],
      };
    } catch (error) {
      this.logger.error('updated failed ', error);

      throw new HttpException(
        {
          success: false,
          message: 'Failed to update Roles',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string) {
    try {
      const deleted = await this.db
        .delete(roles)
        .where(eq(roles.id, id))
        .returning();

      return {
        success: true,
        message: 'Roles deleted successfully.',
      };
    } catch (error) {
      this.logger.error('❌ Delete failed', error || error);
      throw new HttpException(
        {
          success: false,
          message: 'Failed to delete Roles due to a server error.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
