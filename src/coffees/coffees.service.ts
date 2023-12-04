import { Injectable } from '@nestjs/common';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { CoffeeDto, CoffeeWithFlavorsDto } from './dto/coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class CoffeesService {
  constructor(private readonly prismaService: PrismaService) { }

  async findAll(
    paginationQueryDto: PaginationQueryDto,
    includeFlavors: true,
  ): Promise<CoffeeWithFlavorsDto[]>;
  async findAll(
    paginationQueryDto: PaginationQueryDto,
    includeFlavors: false,
  ): Promise<CoffeeDto[]>;
  async findAll(
    paginationQueryDto: PaginationQueryDto,
    includeFlavors = true,
  ): Promise<CoffeeDto[] | CoffeeWithFlavorsDto[]> {
    const coffees = await this.prismaService.coffee.findMany({
      skip: paginationQueryDto.offset,
      take: paginationQueryDto.limit,
      include: {
        flavors: includeFlavors,
      },
    });

    return coffees;
  }

  async findOne(
    id: number,
    includeFlavors: true,
  ): Promise<CoffeeWithFlavorsDto>;
  async findOne(id: number, includeFlavors: false): Promise<CoffeeDto>;
  async findOne(
    id: number,
    includeFlavors = true,
  ): Promise<CoffeeDto | CoffeeWithFlavorsDto> {
    const coffee = await this.prismaService.coffee.findUniqueOrThrow({
      where: { id },
      include: { flavors: includeFlavors },
    });

    return coffee;
  }

  async create(
    createCoffeeDto: CreateCoffeeDto,
    includeFlavors: true,
  ): Promise<CoffeeDto | CoffeeWithFlavorsDto>;
  async create(
    createCoffeeDto: CreateCoffeeDto,
    includeFlavors: false,
  ): Promise<CoffeeDto>;
  async create(
    createCoffeeDto: CreateCoffeeDto,
    includeFlavors = true,
  ): Promise<CoffeeDto | CoffeeWithFlavorsDto> {
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
      include: { flavors: includeFlavors },
    });

    return coffee;
  }

  async update(
    id: number,
    updateCoffeeDto: UpdateCoffeeDto,
    includeFlavors: true,
  ): Promise<CoffeeWithFlavorsDto>;
  async update(
    id: number,
    updateCoffeeDto: UpdateCoffeeDto,
    includeFlavors: false,
  ): Promise<CoffeeDto>;
  async update(
    id: number,
    updateCoffeeDto: UpdateCoffeeDto,
    includeFlavors = true,
  ): Promise<CoffeeDto | CoffeeWithFlavorsDto> {
    // TODO(Gustaf): refactor when prisma supports a deleteOrThrow
    // https://github.com/prisma/prisma/issues/10142
    const existingCoffee = await this.prismaService.coffee.findUniqueOrThrow({
      where: { id },
    });
    const coffee = await this.prismaService.coffee.update({
      where: { id: existingCoffee.id },
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
      include: { flavors: includeFlavors },
    });

    return coffee;
  }

  async remove(id: number, includeFlavors: true): Promise<CoffeeWithFlavorsDto>;
  async remove(id: number, includeFlavors: false): Promise<CoffeeDto>;
  async remove(
    id: number,
    includeFlavors = true,
  ): Promise<CoffeeDto | CoffeeWithFlavorsDto> {
    // TODO(Gustaf): refactor when prisma supports a deleteOrThrow
    // https://github.com/prisma/prisma/issues/10142
    const existingCoffee = await this.prismaService.coffee.findUniqueOrThrow({
      where: { id },
    });
    const coffee = await this.prismaService.coffee.delete({
      where: { id: existingCoffee.id },
      include: { flavors: includeFlavors },
    });
    return coffee;
  }

  async getFlavorsForCoffee(
    coffeeId: number,
    paginationQuery: PaginationQueryDto,
  ) {
    console.warn(
      'TODO: Implement getFlavorsForCoffee',
      coffeeId,
      paginationQuery,
    );
    return [];
    // return this.prismaService.flavor.findMany({
    //   where: { coffee: { id: coffeeId } },
    //   skip: paginationQuery.offset,
    //   take: paginationQuery.limit,
    // });
  }
}
