import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [CoffeesController],
  providers: [PrismaService, CoffeesService],
  exports: [],
})
export class CoffeesModule { }
