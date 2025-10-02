import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { schema, user } from '../database/schema';
import { CreateUserLineDto } from './line-dto';

@Injectable()
export class LineIntegrateService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create({ id, email, image, name }: CreateUserLineDto) {
    try {
      const data = await this.db
        .insert(user)
        .values({
          id,
          email,
          image,
          name,
        })
        .returning();

      return {
        message: ' create user success',
        user: data[0],
      };
    } catch (error) {
      console.error('Error inserting user:', error);
      throw error;
    }
  }

  async getUsers() {
    return this.db.select().from(user);
  }
}
