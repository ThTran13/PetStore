import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ItemType } from "../models/item-types.entity";

export class CreateOrderDto {
  @IsNumber()
  itemId: number;       
  
  @IsString()
  @IsOptional()  
  name?: string;

  @IsNumber()
  @IsOptional() 
  price?: number;

  @IsEnum(ItemType)
  itemType: ItemType;  

  @IsNumber()
  quantity: number;        
}