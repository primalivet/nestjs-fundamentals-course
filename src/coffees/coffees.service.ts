import { Injectable } from '@nestjs/common';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { CoffeeDto } from './dto/coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class CoffeesService {
  constructor(private readonly prismaService: PrismaService) { }

  async findAll(paginationQueryDto: PaginationQueryDto): Promise<CoffeeDto[]> {
    const coffees = await this.prismaService.coffee.findMany({
      skip: paginationQueryDto.offset,
      take: paginationQueryDto.limit,
      include: {
        flavors: true,
      },
    });

    return coffees.map((coffee) => ({
      ...coffee,
      flavors: coffee.flavors.map((flavor) => flavor.name),
    }));
  }

  async findOne(id: number): Promise<CoffeeDto> {
    const coffee = await this.prismaService.coffee.findUniqueOrThrow({
      where: { id },
      include: { flavors: true },
    });

    return {
      ...coffee,
      flavors: coffee.flavors.map((flavor) => flavor.name),
    };
  }

  async create(createCoffeeDto: CreateCoffeeDto): Promise<CoffeeDto> {
    const coffee = await this.prismaService.coffee.create({
      data: {
        ...createCoffeeDto,
        flavors: {
          connectOrCreate: createCoffeeDto.flavors.map((flavor) => ({
            where: { name: flavor },
            create: { name: flavor },
          })),
        },
      },
      include: { flavors: true },
    });

    return {
      ...coffee,
      flavors: coffee.flavors.map((flavor) => flavor.name),
    };
  }

  async update(
    id: number,
    updateCoffeeDto: UpdateCoffeeDto,
  ): Promise<CoffeeDto> {
    const coffee = await this.prismaService.coffee.update({
      where: { id },
      data: {
        ...updateCoffeeDto,
        // HINT: Only modify the flavors if it's present on the DTO
        flavors: Array.isArray(updateCoffeeDto.flavors)
          ? {
            // HINT: reset flavors, if we dont to this the connectOrCreate
            // property would append flavors instead of replace
            set: [],
            connectOrCreate: updateCoffeeDto.flavors.map((flavor) => ({
              where: { name: flavor },
              create: { name: flavor },
            })),
          }
          : undefined,
      },
      include: { flavors: true },
    });

    return {
      ...coffee,
      flavors: coffee.flavors.map((flavor) => flavor.name),
    };
  }

  async remove(id: number): Promise<CoffeeDto> {
    const coffee = await this.prismaService.coffee.delete({
      where: { id },
      include: { flavors: true },
    });
    return {
      ...coffee,
      flavors: coffee.flavors.map((flavor) => flavor.name),
    };
  }
}
