import {
  Args,
  ObjectType,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostModel } from './models/post.model';
import { Connection, ConnectionArgs } from '../common/models/gql-connection.model';
import { GQLConnectionService } from '../common/gql-connection.service';
import { UserService } from '../user/user.service';
import { UserModel } from '../user/models/user.model';

@ObjectType('PostConnection')
export class PostConnection extends Connection(PostModel) { }

@Resolver(() => PostModel)
export class PostModelResolver {
  constructor(private readonly userService: UserService) { }

  @ResolveField(() => UserModel, { name: 'user' })
  getUser(@Parent() post: PostModel): Promise<UserModel> {
    return this.userService.findOne(post.authorId);
  }
}

@ObjectType('PostQueries')
class PostQueries { }

@Resolver(() => PostQueries)
export class PostQueriesResolver {
  constructor(
    private readonly qglConnService: GQLConnectionService,
    private readonly postService: PostService,
  ) { }

  @Query(() => PostQueries, { name: 'postQueries' })
  getRoot() {
    return new PostQueries();
  }

  @ResolveField(() => PostConnection, { name: 'posts' })
  async getPosts(@Args() arg: ConnectionArgs): Promise<PostConnection> {
    const postConnection = await this.qglConnService.runQuery(
      (paginationQuery) => this.postService.findAll(paginationQuery),
      arg,
    );
    return postConnection;
  }

  @ResolveField(() => PostModel, { name: 'post' })
  async getPost(@Args('id') id: number) {
    const post = await this.postService.findOne(id);
    return post;
  }
}
