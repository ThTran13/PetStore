import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ItemType } from "../models/item-types.entity";

export class GetOrderDto {
  @IsNumber()
  itemId: number;       
  
  @IsString()
  name?: string;

  @IsNumber()
  price?: number;

  @IsEnum(ItemType)
  itemType: ItemType;  

  @IsNumber()
  quantity: number;        
}