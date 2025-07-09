import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { MenuOption } from './menu_options.dto';
import { menus, schema } from 'src/database';
import { menuOptions } from 'src/database/schema/menu_options';
import { eq } from 'drizzle-orm';

@Injectable()
export class MenuOptionsService {
  private readonly logger = new Logger(MenuOptionsService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(dto: MenuOption) {
    try {
      const menuExists = await this.db.query.menus.findFirst({
        where: eq(menuOptions.id, menus.id),
      });

      if (!menuExists) {
        throw new BadRequestException('Menu not found');
      }

      const result = await this.db
        .insert(menuOptions)
        .values({
          menuId: dto.menuId,
          name: dto.name,
          quantity: dto.quantity,
          price: dto.price.toString(),
          available: dto.available ?? true,
        })
        .returning();

      return {
        success: true,
        data: result[0],
      };
    } catch (error) {
      this.logger.error('Failed to create menu option:', error);
    }
  }
}
