import {
  Args,
  ObjectType,
  Mutation,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostModel } from './models/post.model';
import { CreatePostModel } from './models/create-post.model';
import { UpdatePostModel } from './models/update-post.model';

@ObjectType('PostMutations')
class PostMutations { }

@Resolver(() => PostMutations)
export class PostMutationsResolver {
  constructor(private readonly postService: PostService) { }

  @Mutation(() => PostMutations, { name: 'postMutations' })
  getRoot() {
    return new PostMutations();
  }

  @ResolveField(() => PostModel, { name: 'create' })
  async createPost(@Args('createPostInput') createPostDto: CreatePostModel) {
    const post = await this.postService.create(createPostDto);
    return post;
  }

  @ResolveField(() => PostModel, { name: 'update' })
  async updatePost(
    @Args('id') id: number,
    @Args('updatePostInput') updatePostDto: UpdatePostModel,
  ) {
    const post = await this.postService.update(id, updatePostDto);
    return post;
  }
}
