import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({
    required: true,
    example: 'Colombia',
    description: 'The name of the coffee',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    required: true,
    example: 'Gevalia',
    description: 'The brand of the coffee',
  })
  @IsString()
  readonly brand: string;

  @ApiProperty({
    required: false,
    description: 'The description of the coffee',
    example: 'Dark roast coffee with a hint of chocolate',
    default: '',
  })
  @IsString()
  readonly description?: string;

  @ApiProperty({
    required: false,
    example: ['chocolate', 'vanilla'],
    description: 'The flavors of the coffee',
  })
  @IsString({ each: true })
  readonly flavors: string[];
}
