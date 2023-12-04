import {
  Query,
  Args,
  Int,
  Resolver,
  ObjectType,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CoffeeModel, FlavorModel } from './models/coffee.model';
import { CoffeesService } from './coffees.service';
import { PrismaClientExceptionFilterGQL } from '../prisma/prisma-client-exception.filter';
import { UseFilters } from '@nestjs/common';
import { GQLConnectionService } from '../common/gql-connection.service';
import {
  Connection,
  ConnectionArgs,
} from '../common/models/gql-connection.model';

@ObjectType('CoffeeConnection')
class CoffeeConnection extends Connection(CoffeeModel) { }

@ObjectType('FlavorConnection')
class FlavorConnection extends Connection(FlavorModel) { }

@Resolver(() => CoffeeModel)
export class CoffeeModuleResolver {
  constructor(
    private readonly gqlConnService: GQLConnectionService,
    private readonly coffeeService: CoffeesService,
  ) { }

  @ResolveField(() => FlavorConnection, { name: 'flavors' })
  async getFlavors(
    @Parent() coffee: CoffeeModel,
    @Args() args: ConnectionArgs,
  ) {
    const flavorConnection = await this.gqlConnService.runQuery(
      (paginationQuery) =>
        this.coffeeService.getFlavorsForCoffee(coffee.id, paginationQuery),
      args,
    );
    return flavorConnection;
  }
}

@ObjectType('CoffeeQueries')
class CoffeeQueries { }

@UseFilters(PrismaClientExceptionFilterGQL)
@Resolver(() => CoffeeQueries)
export class CoffeesQueryResolver {
  constructor(
    private readonly gqlConnService: GQLConnectionService,
    private readonly coffeeService: CoffeesService,
  ) { }

  @Query(() => CoffeeQueries, { name: 'coffeeQueries' })
  getRoot() {
    return new CoffeeQueries();
  }

  @ResolveField(() => CoffeeConnection, { name: 'coffees' })
  async getCoffees(@Args() arg: ConnectionArgs): Promise<CoffeeConnection> {
    const coffeeConnection = await this.gqlConnService.runQuery(
      (paginationQuery) => this.coffeeService.findAll(paginationQuery, false),
      arg,
    );
    return coffeeConnection;
  }

  @ResolveField(() => CoffeeModel, { name: 'coffee' })
  async getCoffee(@Args('id', { type: () => Int }) id: number) {
    const coffee = await this.coffeeService.findOne(id, false);
    return coffee;
  }
}
