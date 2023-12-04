import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreatePostModel {
  @Field(() => String)
  @IsString()
  readonly title: string;

  @Field(() => Int)
  @IsNumber()
  readonly authorId: number;
}
