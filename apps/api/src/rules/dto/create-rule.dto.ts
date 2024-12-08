import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString, IsUUID, Min, MinLength } from "class-validator";
import { Product } from "src/products/entities/product.entity";


export class CreateRuleDto {

  // This field is only allowed for testing purposes
  // is needed to run a seed script to populate the database
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  type: string;

  @IsNumber()
  amount: number;

  @IsArray()
  @ArrayNotEmpty()
  productList: string[];

  @IsNotEmptyObject()
  product: Product;
}
