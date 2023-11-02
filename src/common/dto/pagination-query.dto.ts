import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

@InputType()
export class PaginationQueryDto {
  @ApiPropertyOptional({
    required: false,
    default: 30,
    description: 'The number of items',
  })
  @IsNumber()
  @Field((type) => Int, { defaultValue: 30 })
  limit?: number;

  @ApiPropertyOptional({
    required: false,
    default: 0,
    description: 'The offset of the items',
  })
  @IsNumber()
  @Field((type) => Int, { defaultValue: 0 })
  offset?: number;
}
