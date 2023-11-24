import {
  Args,
  Int,
  Resolver,
  Mutation,
  ObjectType,
  ResolveField,
} from '@nestjs/graphql';
import { CoffeeDto } from './dto/coffee.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PrismaClientExceptionFilterGQL } from '../prisma/prisma-client-exception.filter';
import { UseFilters } from '@nestjs/common';

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

  @ResolveField(() => CoffeeDto, { name: 'create' })
  createCoffee(
    @Args('createCoffee', { type: () => CreateCoffeeDto })
    createCoffeeDto: CreateCoffeeDto,
  ) {
    return this.coffeeService.create(createCoffeeDto);
  }

  @ResolveField(() => CoffeeDto, { name: 'update' })
  updateCoffee(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateCoffee', { type: () => UpdateCoffeeDto })
    updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @ResolveField(() => CoffeeDto, { name: 'delete' })
  deleteCoffee(@Args('id', { type: () => Int }) id: number) {
    return this.coffeeService.remove(id);
  }
}
