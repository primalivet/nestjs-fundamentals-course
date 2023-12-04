import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { CoffeeModuleResolver as CoffeeModelResolver, CoffeesQueryResolver } from './coffees.query.resolver';
import { CoffeesMutationsResolver } from './coffees.mutation.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { GQLConnectionService } from '../common/gql-connection.service';

@Module({
  imports: [],
  controllers: [CoffeesController],
  providers: [
    PrismaService,
    CoffeesService,
    GQLConnectionService,
    CoffeeModelResolver,
    CoffeesQueryResolver,
    CoffeesMutationsResolver,
  ],
  exports: [],
})
export class CoffeesModule { }
