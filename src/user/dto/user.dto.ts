import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PostDto } from '../../post/dto/post.dto';

@ObjectType('User')
export class UserDto {
  @Field(() => Int)
  id: number;
  @Field(() => String)
  firstName: string;
  @Field(() => String)
  lastName: string;
  @Field(() => [PostDto])
  posts: PostDto[];
}
