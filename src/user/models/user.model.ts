import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PostModel } from '../../post/models/post.model';

@ObjectType('User')
export class UserModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => [PostModel], { nullable: 'items' })
  posts?: PostModel[];
}
