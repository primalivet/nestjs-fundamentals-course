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
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CoffeeDto } from './dto/coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ApiPrismaClientHttpExceptions } from '../prisma/prisma-client-exception.filter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) { }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [CoffeeDto] })
  findAll(
    @Query() paginationQueryDto: PaginationQueryDto = { limit: 30, offset: 0 },
  ): Promise<CoffeeDto[]> {
    return this.coffeeService.findAll(paginationQueryDto);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: CoffeeDto })
  @ApiPrismaClientHttpExceptions()
  findOne(@Param('id') id: number): Promise<CoffeeDto> {
    return this.coffeeService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: CoffeeDto })
  @ApiPrismaClientHttpExceptions()
  create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<CoffeeDto> {
    return this.coffeeService.create(createCoffeeDto);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, type: CoffeeDto })
  @ApiPrismaClientHttpExceptions()
  update(
    @Param('id') id: number,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ): Promise<CoffeeDto> {
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiPrismaClientHttpExceptions()
  remove(@Param('id') id: number): Promise<void> {
    return this.coffeeService.remove(id);
  }
}
