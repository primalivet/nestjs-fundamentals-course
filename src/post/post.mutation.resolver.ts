import {
  Args,
  ObjectType,
  Mutation,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ObjectType('PostMutations')
class PostMutations { }

@Resolver(() => PostMutations)
export class PostMutationsResolver {
  constructor(private readonly postService: PostService) { }

  @Mutation(() => PostMutations, { name: 'postMutations' })
  getRoot() {
    return new PostMutations();
  }

  @ResolveField(() => PostDto, { name: 'create' })
  async createPost(@Args('createPostInput') createPostDto: CreatePostDto) {
    const post = await this.postService.create(createPostDto);
    return post;
  }

  @ResolveField(() => PostDto, { name: 'update' })
  async updatePost(
    @Args('id') id: number,
    @Args('updatePostInput') updatePostDto: UpdatePostDto,
  ) {
    const post = await this.postService.update(id, updatePostDto);
    return post;
  }
}
