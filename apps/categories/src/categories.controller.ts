import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreatePetDto } from './pets/dto/create-pet.dto';
import { CreateProductDto } from './products/dto/create-product.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post('pets')
  async createPet(@Body() createPetDto: CreatePetDto) {
    return this.categoriesService.createPet(createPetDto);
  }
  @Post('products')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.categoriesService.createProduct(createProductDto);
  }

  @Get()
  async getAllCategories(): Promise<GetCategoriesDto> {
    return this.categoriesService.getAllCategories();
  }

  @MessagePattern('get_pet_by_id')
  async getPetById(@Payload() id: number) {
    return this.categoriesService.getPetById(id);
  }

  @MessagePattern('get_product_by_id')
  async getProductById(@Payload() id: number) {
    return this.categoriesService.getProductById(id);
  }
}
