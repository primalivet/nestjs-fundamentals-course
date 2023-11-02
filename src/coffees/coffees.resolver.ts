import { Query, Args, Int, Resolver, Mutation } from '@nestjs/graphql';
import { CoffeeDto } from './dto/coffee.dto';
import { CoffeesService } from './coffees.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PrismaClientExceptionFilterGQL } from '../prisma/prisma-client-exception.filter';
import { UseFilters } from '@nestjs/common';

@UseFilters(PrismaClientExceptionFilterGQL)
@Resolver((of) => CoffeeDto)
export class CoffeesResolver {
  constructor(private readonly coffeeService: CoffeesService) { }

  @Query((returns) => CoffeeDto, { name: 'coffee' })
  getCoffee(@Args('id', { type: () => Int }) id: number) {
    return this.coffeeService.findOne(id);
  }

  @Query((returns) => [CoffeeDto], { name: 'coffees' })
  getCoffees(
    @Args('paginationQuery', {
      type: () => PaginationQueryDto,
      defaultValue: { limit: 30, offset: 0 },
    })
    paginationQuery: PaginationQueryDto,
  ) {
    return this.coffeeService.findAll(paginationQuery);
  }

  @Mutation((returns) => CoffeeDto)
  createCoffee(
    @Args('createCoffeeDto', { type: () => CreateCoffeeDto })
    createCoffeeDto: CreateCoffeeDto,
  ) {
    return this.coffeeService.create(createCoffeeDto);
  }

  @Mutation((returns) => CoffeeDto)
  updateCoffee(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateCoffeeDto', { type: () => UpdateCoffeeDto })
    updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Mutation((returns) => CoffeeDto)
  deleteCoffee(@Args('id', { type: () => Int }) id: number) {
    return this.coffeeService.remove(id);
  }
}
