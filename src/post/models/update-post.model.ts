import { InputType, Field,Int } from '@nestjs/graphql';

@InputType()
export class UpdatePostModel {
  @Field(() => String, { nullable: true })
  readonly title?: string;

  @Field(() => Int, { nullable: true })
  readonly votes?: number;

  @Field(() => Int, { nullable: true })
  readonly authorId?: number;
}
