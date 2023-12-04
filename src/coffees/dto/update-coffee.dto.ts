import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateCoffeeDto {
  @ApiProperty({
    required: false,
    example: 'Colombia',
    description: 'The name of the coffee',
  })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    required: false,
    example: 'Gevalia',
    description: 'The brand of the coffee',
  })
  @IsString()
  @IsOptional()
  readonly brand?: string;

  @ApiProperty({
    required: false,
    description: 'The description of the coffee',
    example: 'Dark roast coffee with a hint of chocolate',
    default: '',
  })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({
    required: false,
    example: ['chocolate', 'vanilla'],
    description: 'The flavors of the coffee',
  })
  @IsString({ each: true })
  @IsOptional()
  readonly flavors?: string[];
}
