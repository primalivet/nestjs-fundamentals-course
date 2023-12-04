import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';

@InputType('CreateCoffeeInput')
export class CreateCoffeeModel {
  @IsString()
  @Field(() => String)
  readonly name: string;

  @IsString()
  @Field(() => String)
  readonly brand: string;

  @IsString()
  @Field(() => String)
  readonly description: string;

  @IsArray({ each: true })
  @Field(() => [String], { nullable: 'items' })
  readonly flavors: string[];
}
