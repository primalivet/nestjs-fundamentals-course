import { InputType, Field, Int } from '@nestjs/graphql';

@InputType('CreatePostInput')
export class CreatePostDto {
  @Field(() => String)
  title: string;
  @Field(() => Int)
  votes: number;
  @Field(() => Int)
  authorId: number;
}
