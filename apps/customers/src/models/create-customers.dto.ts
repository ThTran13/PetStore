import {
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateCustomersDto {
    @IsNumber()
    address: number;

    @IsString()
    name: string;

    @IsNumber()
    phoneNum: number;
}
