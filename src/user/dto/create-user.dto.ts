import { InputType, Field } from '@nestjs/graphql';

@InputType('CreateUserInput')
export class CreateUserDto {
  @Field(() => String)
  readonly firstName: string;
  @Field(() => String)
  readonly lastName: string;
}
