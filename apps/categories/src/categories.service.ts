import { Injectable } from '@nestjs/common';
import { PetsService } from './pets/pets.service';
import { ProductsService } from './products/products.service';
import { CreatePetDto } from './pets/dto/create-pet.dto';
import { CreateProductDto } from './products/dto/create-product.dto';
import { Category } from './models/categories.entity';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { CreateCategoryDto } from './dto/create-categories.dto';
import { Pet, Product } from '@app/common';

@Injectable()
export class CategoriesService {
    constructor(
        private readonly petsService: PetsService,
        private readonly productsService: ProductsService,
    ) { }

    async createPet(createPetDto: CreatePetDto) {
        return this.petsService.create(createPetDto);
    }

    async createProduct(createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    async getPetCategory(): Promise<Category> {
        const [pets, petsCount] = await Promise.all([
            this.petsService.findAll(),
            this.petsService.count(),
        ]);

        return new Category({
            name: 'pets',
            totalItems: petsCount,
            items: pets,
        });
    }

    async getProductCategory(): Promise<Category> {
        const [products, productsCount] = await Promise.all([
            this.productsService.findAll(),
            this.productsService.count(),
        ]);

        return new Category({
            name: 'products',
            totalItems: productsCount,
            items: products,
        });
    }

    async getPetById(id: number): Promise<Pet> {
        return this.petsService.findOne(id);
    }

    async getProductById(id: number): Promise<Product> {
        return this.productsService.findOne(id);
    }

    async getAllCategories(): Promise<GetCategoriesDto> {
        const [petCategory, productCategory] = await Promise.all([
            this.getPetCategory(),
            this.getProductCategory(),
        ]);

        const categories: CreateCategoryDto[] = [petCategory, productCategory];
        const totalItems = categories.reduce((sum, category) => sum + category.totalItems, 0);

        return {
            categories,
            totalItems,
        };
    }

}
