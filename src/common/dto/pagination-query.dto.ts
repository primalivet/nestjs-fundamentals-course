import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class PaginationQueryDto {
  @ApiPropertyOptional({ required: false, default: 30, description: "The number of items" })
  @IsNumber()
  limit?: number;

  @ApiPropertyOptional({ required: false, default: 0, description: "The offset of the items" })
  @IsNumber()
  offset?: number;
}
