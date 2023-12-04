import { ConnectionArgs, Edge, Connection } from './models/gql-connection.model';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Logger } from '@nestjs/common';

/**
 * Represents an object with atleast an id property, this is an underlying
 * requirement for a Cursor
 */
type ObjectWithId = {
  id: string | number;
  [key: string]: any;
};

/**
 * Represents a valid connection arguments combination
 */
type ValidConnectionArgs =
  | {
    direction: typeof connectionPagingDirection.ForwardFromStart;
    first: number;
  }
  | {
    direction: typeof connectionPagingDirection.Forward;
    first: number;
    after: number /* id (cursor) is int */;
  }
  | {
    direction: typeof connectionPagingDirection.Backward;
    last: number;
    before: number /* id (cursor) is int */;
  };

// const cursorSortDirection = {
//   Asc: 'ASC',
//   Desc: 'DESC',
// } as const;

// /**
//  * Allowed sorting directions for a cursor
//  */
// type CursorSortDirection =
//   (typeof cursorSortDirection)[keyof typeof cursorSortDirection];

const connectionPagingDirection = {
  ForwardFromStart: 'FORWARD_FROM_START',
  Forward: 'FORWARD',
  Backward: 'BACKWARD',
} as const;

function createEdge<T extends ObjectWithId>(item: T): Edge<T> {
  return {
    cursor: String(item.id),
    node: item,
  };
}

export class GQLConnectionService {
  constructor(private readonly logger: Logger) { }

  /**
   * Validate a given ConnectionArgs into a allowed combination of arguments.
   * Allowed combinations are: { first, after } or { last, before } or { first }
   * @throws Error
   */
  validateConnectionArgs(connectionArgs: ConnectionArgs): ValidConnectionArgs {
    const { first, last, after: afterStr, before: beforeStr } = connectionArgs;
    const after = Number.parseInt(afterStr, 10);
    const before = Number.parseInt(beforeStr, 10);
    const firstIsSafeInt = Number.isSafeInteger(first);
    const afterIsSafeInt = Number.isSafeInteger(after);
    const lastIsSafeInt = Number.isSafeInteger(last);
    const beforeIsSafeInt = Number.isSafeInteger(before);

    if (firstIsSafeInt && first < 0) {
      throw new Error('first must be greater than or equal to 0');
    }

    if (lastIsSafeInt && last < 0) {
      throw new Error('last must be greater than or equal to 0');
    }

    if (
      firstIsSafeInt &&
      !afterIsSafeInt &&
      !lastIsSafeInt &&
      !beforeIsSafeInt
    ) {
      return { direction: connectionPagingDirection.ForwardFromStart, first };
    }

    if (
      firstIsSafeInt &&
      afterIsSafeInt &&
      !lastIsSafeInt &&
      !beforeIsSafeInt
    ) {
      return { direction: connectionPagingDirection.Forward, first, after };
    }

    if (
      lastIsSafeInt &&
      beforeIsSafeInt &&
      !firstIsSafeInt &&
      !afterIsSafeInt
    ) {
      return { direction: connectionPagingDirection.Backward, last, before };
    }

    console.error(JSON.stringify(connectionArgs));
    throw new Error('Invalid connection args');
  }

  /**
   * Creates a pagination query "{ limit, offset }" from a given
   * ValidConnectionArgs
   */
  toPaginationQuery(
    validConnectionArgs: ValidConnectionArgs,
  ): PaginationQueryDto {
    switch (validConnectionArgs.direction) {
      case connectionPagingDirection.ForwardFromStart: {
        const { first } = validConnectionArgs;
        const paginationQuery = { offset: 0, limit: first };
        return paginationQuery;
      }
      case connectionPagingDirection.Forward: {
        const { first, after } = validConnectionArgs;
        const paginationQuery = { offset: after, limit: first };
        return paginationQuery;
      }
      case connectionPagingDirection.Backward: {
        const { last, before } = validConnectionArgs;
        const paginationQuery = {
          offset: Math.max(0, before - 1 - last),
          limit: last > before - 1 ? before - 1 : last,
        };
        return paginationQuery;
      }
    }
  }

  /**
   * Widen the pagination query to include one item before and after the original
   * pagination query
   */
  widenPaginationQuery(
    paginationQuery: PaginationQueryDto,
  ): PaginationQueryDto {
    const { offset, limit } = paginationQuery;
    const widenedOffset = offset > 0 ? offset - 1 : 0;
    const widenedLimit = offset > 0 ? limit + 2 : limit + 1;
    return { offset: widenedOffset, limit: widenedLimit };
  }

  /**
   * Retrive a GQLConnection from a list of items
   */
  getConnectionResult<T extends ObjectWithId>(
    items: T[],
    paginationQuery: PaginationQueryDto,
    widenedPaginationQuery: PaginationQueryDto,
  ): Connection<T> {
    const { offset, limit } = paginationQuery;
    const { limit: widenedLimit } = widenedPaginationQuery;

    const originalStartIndex = offset > 0 ? 1 : 0;
    const originalEndIndex = originalStartIndex + limit;

    const edges = items
      .slice(originalStartIndex, originalEndIndex)
      .map(createEdge);
    const hasPrevPage = offset > 0 ? items.length >= limit : false;
    const hasNextPage =
      offset > 0 ? items.length >= widenedLimit : items.length > limit;
    const startCursor = edges.length > 0 ? String(edges[0].cursor) : '';
    const endCursor =
      edges.length > 0 ? String(edges[edges.length - 1].cursor) : '';
    const totalCount = 0;

    return {
      totalCount,
      edges,
      pageInfo: {
        startCursor,
        endCursor,
        hasNextPage,
        hasPrevPage,
      },
    };
  }

  async runQuery<T extends ObjectWithId>(
    query: (paginationQuery: PaginationQueryDto) => Promise<T[]>,
    connectionArgs: ConnectionArgs,
  ) {
    const validConnectionArgs = this.validateConnectionArgs(connectionArgs);
    const paginationQuery = this.toPaginationQuery(validConnectionArgs);
    const widenedPaginationQuery = this.widenPaginationQuery(paginationQuery);
    const items = await query(widenedPaginationQuery);
    const connectionResult = this.getConnectionResult(
      items,
      paginationQuery,
      widenedPaginationQuery,
    );

    return connectionResult;
  }
}
