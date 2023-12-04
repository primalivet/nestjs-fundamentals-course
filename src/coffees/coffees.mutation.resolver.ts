import {
  Args,
  Int,
  Resolver,
  Mutation,
  ObjectType,
  ResolveField,
} from '@nestjs/graphql';
import { CreateCoffeeModel } from './models/create-coffee.model';
import { UpdateCoffeeModel } from './models/update-coffee.model';
import { CoffeesService } from './coffees.service';
import { PrismaClientExceptionFilterGQL } from '../prisma/prisma-client-exception.filter';
import { UseFilters } from '@nestjs/common';
import { CoffeeModel } from './models/coffee.model';

@ObjectType('CoffeeMutations')
class CoffeeMutations { }

@UseFilters(PrismaClientExceptionFilterGQL)
@Resolver(() => CoffeeMutations)
export class CoffeesMutationsResolver {
  constructor(private readonly coffeeService: CoffeesService) { }

  @Mutation(() => CoffeeMutations, { name: 'coffeeMutations' })
  getRoot() {
    return new CoffeeMutations();
  }

  @ResolveField(() => CoffeeModel, { name: 'create' })
  createCoffee(
    @Args('data', { type: () => CreateCoffeeModel }) data: CreateCoffeeModel,
  ): Promise<CoffeeModel> {
    return this.coffeeService.create(data, false);
  }

  @ResolveField(() => CoffeeModel, { name: 'update' })
  updateCoffee(
    @Args('id', { type: () => Int }) id: number,
    @Args('data', { type: () => UpdateCoffeeModel })
    data: UpdateCoffeeModel,
  ): Promise<CoffeeModel> {
    return this.coffeeService.update(id, data, false);
  }

  @ResolveField(() => CoffeeModel, { name: 'delete' })
  deleteCoffee(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<CoffeeModel> {
    return this.coffeeService.remove(id, false);
  }
}
