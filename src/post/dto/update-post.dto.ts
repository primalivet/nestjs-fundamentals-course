import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsNumber()
  readonly votes?: number;

  @IsOptional()
  @IsNumber()
  readonly authorId?: number;
}
