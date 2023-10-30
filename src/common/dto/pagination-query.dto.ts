import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({ description: 'Limit of the amount of items', example: 10 })
  @IsOptional()
  @IsPositive()
  limit: number;

  @ApiProperty({
    description: 'Offset of the items from the first item',
    example: 10,
  })
  @IsOptional()
  @IsPositive()
  offset: number;
}
