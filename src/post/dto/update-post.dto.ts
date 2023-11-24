import { InputType, Field,Int } from '@nestjs/graphql';

@InputType('UpdatePostInput')
export class UpdatePostDto {
  @Field(() => String, { nullable: true })
  readonly title?: string;
  @Field(() => Int, { nullable: true })
  readonly votes?: number;
  @Field(() => Int, { nullable: true })
  readonly authorId?: number;
}
