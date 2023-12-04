import {
  Resolver,
  Query,
  ObjectType,
  ResolveField,
  Args,
  Parent,
} from '@nestjs/graphql';
import { UserModel } from './models/user.model';
import { UserService } from './user.service';
import { PostService } from '../post/post.service';
import { PostConnection } from '../post/post.query.resolver';
import {
  Connection,
  ConnectionArgs,
} from '../common/models/gql-connection.model';
import { GQLConnectionService } from '../common/gql-connection.service';
import { Logger } from '@nestjs/common';

@ObjectType('UserConnection')
export class UserConnection extends Connection(UserModel) { }

@Resolver(() => UserModel)
export class UserModelResolver {
  constructor(
    private readonly gqpConnService: GQLConnectionService,
    private readonly postService: PostService,
  ) { }

  @ResolveField(() => PostConnection, { name: 'posts' })
  async getPosts(
    @Parent() user: UserModel,
    @Args() args: ConnectionArgs,
  ): Promise<PostConnection> {
    const postConnection = await this.gqpConnService.runQuery(
      (pagination) => this.postService.findAllByUserId(pagination, user.id),
      args,
    );
    return postConnection;
  }
}

@ObjectType('UserQueries')
class UserQueries { }

@Resolver(() => UserQueries)
export class UserQueriesResolver {
  constructor(
    private readonly gqlConnService: GQLConnectionService,
    private readonly userService: UserService,
  ) { }

  @Query(() => UserQueries, { name: 'userQueries' })
  getRoot() {
    return new UserQueries();
  }

  @ResolveField(() => UserConnection, { name: 'users' })
  async getUsersConnection(
    @Args() args: ConnectionArgs,
  ): Promise<UserConnection> {
    const userConnection = await this.gqlConnService.runQuery(
      (paginationQuery) => this.userService.findAll(paginationQuery),
      args,
    );

    return userConnection;
  }

  @ResolveField(() => UserModel, { name: 'user' })
  async getUser(@Args('id') id: number) {
    const user = await this.userService.findOne(id);
    return user;
  }
}
