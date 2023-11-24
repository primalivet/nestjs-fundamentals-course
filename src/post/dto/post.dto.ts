import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Post')
export class PostDto {
  @Field(() => String)
  id: string;
  @Field(() => String)
  title: string;
  @Field(() => Int)
  votes: number;
  @Field(() => Int)
  authorId: number;
}
