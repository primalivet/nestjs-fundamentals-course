import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CoffeeDto } from './dto/coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PrismaClientExceptionFilter, ApiPrismaClientHttpExceptions } from '../prisma/prisma-client-exception.filter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@UseFilters(PrismaClientExceptionFilter)
@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) { }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [CoffeeDto] })
  findAll(
    @Query() paginationQueryDto: PaginationQueryDto = { limit: 30, offset: 0 },
  ): Promise<CoffeeDto[]> {
    return this.coffeeService.findAll(paginationQueryDto, true);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: CoffeeDto })
  @ApiPrismaClientHttpExceptions()
  findOne(@Param('id') id: number): Promise<CoffeeDto> {
    return this.coffeeService.findOne(id, true);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: CoffeeDto })
  @ApiPrismaClientHttpExceptions()
  create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<CoffeeDto> {
    return this.coffeeService.create(createCoffeeDto, true);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, type: CoffeeDto })
  @ApiPrismaClientHttpExceptions()
  update(
    @Param('id') id: number,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ): Promise<CoffeeDto> {
    return this.coffeeService.update(id, updateCoffeeDto, true);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiPrismaClientHttpExceptions()
  remove(@Param('id') id: number): Promise<CoffeeDto> {
    return this.coffeeService.remove(id, true);
  }
}
