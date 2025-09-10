import { Inject, Injectable, Logger } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';

@Injectable()
export class LineUsersService {
  private readonly logger = new Logger(LineUsersService.name);

  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  // async create(data: LineUsersDto) {
  //   this.logger.debug('Received Line user data:', data);
  //   try {
  //     await this.db
  //       .insert(lineUser)
  //       .values(data)
  //       .onConflictDoNothing()
  //       .returning();

  //     await this.db
  //       .insert(user)
  //       .values({
  //         id : data.id,
  //         name: data.name,
  //         image: data.image,
  //       })
  //       .onConflictDoNothing()
  //       .returning();

  //     const [userRecord] = await this.db.select().from(users).limit(1);

  //     if (!userRecord) {
  //       throw new Error('User not found after insert');
  //     }

  //     const existingCustomer = await this.db
  //       .select()
  //       .from(customers)
  //       .where(eq(customers.userId, userRecord.id))
  //       .limit(1);

  //     // Insert customer only if it doesn't exist
  //     // if (existingCustomer.length === 0) {
  //     //   await this.db.insert(customers).values();
  //     // }

  //     //get jwt using Auth sevice
  //     return;
  //   } catch (error) {
  //     this.logger.error('Failed to create line user', error);

  //     throw new HttpException(
  //       {
  //         success: false,
  //         message: 'An error occurred while creating the line user.',
  //       },
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
}
