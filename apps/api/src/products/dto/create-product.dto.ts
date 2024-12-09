import { IsOptional, IsPositive, IsString, IsUUID, Min } from "class-validator";

export class CreateProductDto {

  // This field is only allowed for testing purposes
  // is needed to run a seed script to populate the database
  @IsOptional()
  @IsUUID()
  id?: string;


  @IsString()
  name: string;

  @IsPositive()
  @Min(1)
  price: number

  @IsString()
  category: string;
}
