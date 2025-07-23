import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { users } from '../database/schema/users';
import { schema } from 'src/database';
import { eq } from 'drizzle-orm';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async getProfile(userId: string) {
    const rows = await this.db
      .select({
        id: users.id,
        email: users.email,
        username: users.username,
        imageUrl: users.linePictureUrl,
        displayName: users.lineDisplayName,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    return rows[0];
  }
}
