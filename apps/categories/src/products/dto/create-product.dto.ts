import {
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProductDto {
    @IsNumber()
    cost: number;

    @IsString()
    belongTo: string;

    @IsString()
    name: string;

    @IsString()
    madeIn: string;
}
