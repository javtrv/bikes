import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCategoryDto {


  // This field is only allowed for testing purposes
  // is needed to run a seed script to populate the database
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsArray({ each: true })
  products?: string[];
}
