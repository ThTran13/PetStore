import {
  IsNumber,
  IsString,
} from 'class-validator';

export class CreatePetDto {
    @IsNumber()
    cost: number;

    @IsString()
    name: string;

    @IsNumber()
    age: number;

    @IsString()
    breed: string;
}
