import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreatePetDto } from './pets/dto/create-pet.dto';
import { CreateProductDto } from './products/dto/create-product.dto';
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

  @Get('pets')
  async getAllPets() {
    return this.categoriesService.getPets();
  }

  @Get('products')
  async getAllProducts() {
    return this.categoriesService.getProducts();
  }

  @Get()
  async getAllCategories() {
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

  @Delete('pets/:id')
  async remove(@Param('id') id: string) {
    return this.categoriesService.deletePet(+id);
  }

  @Delete('products/:id')
  async removeProduct(@Param('id') id: string) {
    return this.categoriesService.deleteProduct(+id);
  }

}
