import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './enities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { StockEntity } from './enities/product-stock.entity';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([StockEntity, ProductEntity]), UserModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
