import { IsArray, IsNumber } from "class-validator";
import { CreateCategoryDto } from "./create-categories.dto";

export class GetCategoriesDto {
    @IsArray()
    categories: CreateCategoryDto[];

    @IsNumber()
    totalItems: number;
}