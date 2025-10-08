import { Type } from "class-transformer";
import { IsArray, IsDate, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateOrderDto } from "./create-orders.dto";

export class CreateTransactionDto {
    @IsNumber()
    customerId: number;

    @IsNumber()
    @IsOptional() 
    totalAmount?: number;

    @IsString()
    @IsOptional()
    status?: string;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    transactionDate?: Date;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderDto)
    orderItems: CreateOrderDto[];
}