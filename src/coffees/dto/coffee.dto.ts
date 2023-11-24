import { ApiProperty } from '@nestjs/swagger';
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType('Coffee', { description: 'Good cup of brew' })
export class CoffeeDto {
  @ApiProperty({ description: 'The unique identifier of the coffee',
  })
  @Field(() => Int)
  readonly id: number;

  @ApiProperty({
    description: 'The name of the coffee',
  })
  @Field()
  readonly name: string;

  @ApiProperty({
    description: 'The description of the coffee',
  })
  @Field()
  readonly description: string;

  @ApiProperty({
    description: 'The brand of the coffee',
  })
  @Field()
  readonly brand: string;

  @ApiProperty({
    description: 'The flavors of the coffee',
  })
  @Field(() => [String])
  readonly flavors: string[];
}
