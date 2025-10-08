import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { DatabaseModule } from '@app/common';
import { Product } from '@app/common';
import { ProductRepository } from './products.repository';

@Module({
  imports: [DatabaseModule,
    DatabaseModule.forFeature([Product]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository],
  exports: [ProductsService],
})
export class ProductsModule {}
