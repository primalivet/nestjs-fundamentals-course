import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType('UpdateUserModel')
export class UpdateUserModel {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  readonly lastName?: string;
}
