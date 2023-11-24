import {
  Args,
  ObjectType,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';

@ObjectType('PostQueries')
class PostQueries { }

@Resolver(() => PostQueries)
export class PostQueriesResolver {
  constructor(private readonly postService: PostService) { }

  @Query(() => PostQueries, { name: 'postQueries' })
  getRoot() {
    return new PostQueries();
  }

  @ResolveField(() => [PostDto], { name: 'posts' })
  getPosts() {
    return this.postService.findAll();
  }

  @ResolveField(() => PostDto, { name: 'post' })
  getPost(@Args('id') id: number) {
    return this.postService.findOne(id);
  }
}
