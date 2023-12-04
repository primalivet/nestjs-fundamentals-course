import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType('CreateUserInput')
export class CreateUserModel {
  @Field(() => String)
  @IsString()
  readonly firstName: string;

  @Field(() => String)
  @IsString()
  readonly lastName: string;
}
