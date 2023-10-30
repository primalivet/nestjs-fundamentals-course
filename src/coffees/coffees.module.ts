import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CoffeSchema, Coffee } from './entities/coffee.entity';
import { Event, EventSchema } from '../events/entities/event.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Coffee.name, schema: CoffeSchema },
      { name: Event.name, schema: EventSchema },
    ]),
  ],
  controllers: [CoffeesController],
  providers: [CoffeesService],
  exports: [],
})
export class CoffeesModule { }
