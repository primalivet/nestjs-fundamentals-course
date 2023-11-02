import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@InputType()
export class CreateCoffeeDto {
  @ApiProperty({
    required: true,
    example: 'Colombia',
    description: 'The name of the coffee',
  })
  @IsString()
  @Field((type) => String)
  readonly name: string;

  @ApiProperty({
    required: true,
    example: 'Gevalia',
    description: 'The brand of the coffee',
  })
  @IsString()
  @Field((type) => String)
  readonly brand: string;

  @ApiProperty({
    required: false,
    description: 'The description of the coffee',
    example: 'Dark roast coffee with a hint of chocolate',
    default: '',
  })
  @IsString()
  @Field((type) => String, { defaultValue: '' })
  readonly description?: string;

  @ApiProperty({
    required: false,
    example: ['chocolate', 'vanilla'],
    description: 'The flavors of the coffee',
  })
  @IsString({ each: true })
  @Field((type) => [String])
  readonly flavors: string[];
}
