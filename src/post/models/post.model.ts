import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../../user/models/user.model';

@ObjectType()
export class PostModel {
  @Field(() => Int)
  id: number;
  @Field(() => String)
  title: string;
  @Field(() => Int)
  votes: number;
  authorId: number;
  @Field(() => UserModel)
  user?: UserModel;
}
