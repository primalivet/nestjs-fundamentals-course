import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
  @Field(() => String)
  readonly firstName: string;
  @Field(() => String)
  readonly lastName: string;
}
