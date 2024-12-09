import { IsArray, IsOptional, IsPositive, IsString, IsUUID, Min } from "class-validator";

export class CreateCategoryDto {


  // This field is only allowed for testing purposes
  // is needed to run a seed script to populate the database
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsPositive()
  @Min(1)
  order?: number;

  @IsOptional()
  @IsArray({ each: true })
  products?: string[];
}
