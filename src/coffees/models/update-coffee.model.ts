import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType('UpdateCoffeeInput')
export class UpdateCoffeeModel {
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly name?: string;
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly brand?: string;
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly description?: string;
  readonly flavors?: string[];
}
