import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly authorId: number;
}
