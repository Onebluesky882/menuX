import { sql, SQL } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { PgTable } from 'drizzle-orm/pg-core';
import { PaginationParams, PaginationResult } from './pagination.dto';

export async function paginate<T extends PgTable<any>>(
  db: NodePgDatabase,
  table: T,
  whereClause?: (table: T) => SQL<boolean> | undefined, // <-- correct type here
  params: PaginationParams = {},
): Promise<PaginationResult<any>> {
  const page = params.page && params.page > 0 ? params.page : 1;
  const limit = params.limit && params.limit > 0 ? params.limit : 10;
  const offset = (page - 1) * limit;

  // Count total rows with optional where clause
  const countQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(table as any);

  if (whereClause) {
    countQuery.where(whereClause(table));
  }

  const countResult = await countQuery;
  const total = Number(countResult[0]?.count ?? 0);

  // Select paginated data with optional where clause
  const dataQuery = db.select().from(table as any);

  if (whereClause) {
    dataQuery.where(whereClause(table));
  }

  dataQuery.limit(limit).offset(offset);

  const data = await dataQuery;

  const totalPages = Math.ceil(total / limit);

  return {
    data,
    total,
    page,
    limit,
    totalPages,
  };
}
