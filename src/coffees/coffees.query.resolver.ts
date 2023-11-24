import {
  Query,
  Args,
  Int,
  Resolver,
  ObjectType,
  ResolveField,
} from '@nestjs/graphql';
import { CoffeeDto } from './dto/coffee.dto';
import { CoffeesService } from './coffees.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PrismaClientExceptionFilterGQL } from '../prisma/prisma-client-exception.filter';
import { UseFilters } from '@nestjs/common';

@ObjectType('CoffeeQueries')
class CoffeeQueries { }

@UseFilters(PrismaClientExceptionFilterGQL)
@Resolver(() => CoffeeQueries)
export class CoffeesQueryResolver {
  constructor(private readonly coffeeService: CoffeesService) { }

  @Query(() => CoffeeQueries, { name: 'coffeeQueries' })
  getRoot() {
    return new CoffeeQueries();
  }

  @ResolveField(() => CoffeeDto, { name: 'coffee' })
  getCoffee(@Args('id', { type: () => Int }) id: number) {
    return this.coffeeService.findOne(id);
  }

  @ResolveField(() => [CoffeeDto], { name: 'coffees' })
  getCoffees(
    @Args('paginationQuery', {
      type: () => PaginationQueryDto,
      defaultValue: { limit: 30, offset: 0 },
    })
    paginationQuery: PaginationQueryDto,
  ) {
    return this.coffeeService.findAll(paginationQuery);
  }
}
