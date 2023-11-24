import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

@InputType('UpdateCoffeeInput')
export class UpdateCoffeeDto {
  @ApiProperty({
    required: false,
    example: 'Colombia',
    description: 'The name of the coffee',
  })
  @IsString()
  @IsOptional()
  @Field((type) => String, { nullable: true })
  readonly name?: string;

  @ApiProperty({
    required: false,
    example: 'Gevalia',
    description: 'The brand of the coffee',
  })
  @IsString()
  @IsOptional()
  @Field((type) => String, { nullable: true })
  readonly brand?: string;

  @ApiProperty({
    required: false,
    description: 'The description of the coffee',
    example: 'Dark roast coffee with a hint of chocolate',
    default: '',
  })
  @IsString()
  @IsOptional()
  @Field((type) => String, { nullable: true })
  readonly description?: string;

  @ApiProperty({
    required: false,
    example: ['chocolate', 'vanilla'],
    description: 'The flavors of the coffee',
  })
  @IsString({ each: true })
  @IsOptional()
  @Field((type) => [String], { nullable: true })
  readonly flavors?: string[];
}
