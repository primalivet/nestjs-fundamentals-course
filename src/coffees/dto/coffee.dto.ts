import { ApiProperty } from '@nestjs/swagger';

export class CoffeeDto {
  @ApiProperty({
    description: 'The unique identifier of the coffee',
  })
  readonly id: number;

  @ApiProperty({
    description: 'The name of the coffee',
  })
  readonly name: string;

  @ApiProperty({
    description: 'The description of the coffee',
  })
  readonly description: string;

  @ApiProperty({
    description: 'The brand of the coffee',
  })
  readonly brand: string;

  @ApiProperty({
    description: 'The flavors of the coffee',
  })
  readonly flavors: string[];
}
