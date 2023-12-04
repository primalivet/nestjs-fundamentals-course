import { ObjectType, Field, Int, ArgsType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { IsInt, IsOptional, IsString } from 'class-validator';

/**
 * Represents a cursor in a GQLConnection
 */
export type Cursor = string;


// type ConnectionPagingDirection =
//   (typeof connectionPagingDirection)[keyof typeof connectionPagingDirection];

export type Edge<T> = {
  node: T;
  cursor: Cursor;
};

type PageInfo = {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type Connection<T> = {
  totalCount: number;
  edges: Edge<T>[];
  pageInfo: PageInfo;
};

export function Connection<T>(classRef: Type<T>): Type<Connection<T>> {
  @ObjectType(`${classRef.name}Edge`, { isAbstract: true })
  abstract class EdgeType implements Edge<T> {
    @Field(() => String)
    cursor: string;
    @Field(() => classRef)
    node: T;
  }

  @ObjectType(`${classRef.name}PageInfo`, { isAbstract: true })
  abstract class PageInfoType implements PageInfo {
    @Field(() => String)
    startCursor: string;
    @Field(() => String)
    endCursor: string;
    @Field(() => Boolean)
    hasNextPage: boolean;
    @Field(() => Boolean)
    hasPrevPage: boolean;
  }

  @ObjectType(`${classRef.name}Connection`, { isAbstract: true })
  abstract class ConnectionType implements Connection<T> {
    @Field(() => Int)
    totalCount: number;
    @Field(() => [EdgeType], { nullable: true })
    edges: EdgeType[];
    @Field(() => PageInfoType)
    pageInfo: PageInfoType;
  }

  return ConnectionType as Type<Connection<T>>;
}

@ArgsType()
export class ConnectionArgs {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  public before?: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  public after?: string;
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  public first?: number;
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  public last?: number;
}
