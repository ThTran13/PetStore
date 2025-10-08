import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@app/common';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(private readonly productRepository: ProductRepository) { }

    async create(createProductDto: CreateProductDto) {
        const product = new Product({
            ...createProductDto
        })

        return await this.productRepository.create(product);
    }

    async findAll() {
        return this.productRepository.findAll();
    }

    async count() {
        return this.productRepository.count();
    }

    async findOne(id: number) {
        return this.productRepository.findOne({ id });
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        return this.productRepository.findOneAndUpdate(
            { id },
            updateProductDto,
        );
    }

    async remove(id: number) {
        return this.productRepository.findOneAndDelete({ id });
    }
}
