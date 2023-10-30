import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({
    description: 'The name of a coffee',
    example: 'Caramel Macchiato',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The brand of a coffee', example: 'Nescafe' })
  @IsString()
  readonly brand: string;

  @ApiProperty({
    description: 'The flavors of a coffee',
    example: ['chocolate', 'vanilla'],
  })
  @IsString({ each: true })
  readonly flavors: string[];
}
