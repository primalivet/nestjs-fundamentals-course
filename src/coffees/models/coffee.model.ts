import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('FlavorModel')
export class FlavorModel {
  @Field(() => Int)
  readonly id: number;

  @Field(() => String)
  readonly name: string;
}


@ObjectType('CoffeeModel', { description: 'Good cup of brew' })
export class CoffeeModel {
  @Field(() => Int)
  readonly id: number;

  @Field(() => String)
  readonly name: string;

  @Field(() => String)
  readonly description: string;

  @Field(() => String)
  readonly brand: string;

  @Field(() => [FlavorModel], { nullable: 'items' })
  readonly flavors?: FlavorModel[];
}
