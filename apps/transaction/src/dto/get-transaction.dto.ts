import { IsString, IsArray, IsNumber, IsDate, ValidateNested } from 'class-validator';
import { Orders } from '../models/orders.entity';
import { GetOrderDto } from './get-orders.dto';
import { Type } from 'class-transformer';

export class GetTransactionDto {
    @IsNumber()
    id: number;

    @IsNumber()
    customerId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => GetOrderDto)
    orderItems: GetOrderDto[];

    @IsNumber()
    totalAmount: number;

    @IsString()
    status: string;

    @IsDate()
    transactionDate: Date;

}