import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { CoffeesQueryResolver } from './coffees.query.resolver';
import { CoffeesMutationsResolver } from './coffees.mutation.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [CoffeesController],
  providers: [
    PrismaService,
    CoffeesService,
    CoffeesQueryResolver,
    CoffeesMutationsResolver,
  ],
  exports: [],
})
export class CoffeesModule { }
