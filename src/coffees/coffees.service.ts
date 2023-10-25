import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    return this.coffees.push({
      ...createCoffeeDto,
      id: this.coffees.length + 1,
    });
  }

  update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffeeIdx = this.coffees.findIndex(
      (coffee) => coffee.id === Number(id),
    );

    if (existingCoffeeIdx >= 0) {
      const newCoffee = {
        ...this.coffees[existingCoffeeIdx],
        ...updateCoffeeDto,
      };
      this.coffees[existingCoffeeIdx] = newCoffee;
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees = [
        ...this.coffees.slice(0, coffeeIndex),
        ...this.coffees.slice(coffeeIndex + 1),
      ];
    }
  }
}
