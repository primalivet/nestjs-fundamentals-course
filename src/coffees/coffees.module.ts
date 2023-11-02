import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { CoffeesResolver } from './coffees.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [CoffeesController],
  providers: [PrismaService, CoffeesService, CoffeesResolver],
  exports: [],
})
export class CoffeesModule { }
