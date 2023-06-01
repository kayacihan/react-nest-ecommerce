import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ProductEntity } from './enities/product.entity';
import { StockEntity } from './enities/product-stock.entity';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(StockEntity)
    private readonly stockRepository: Repository<StockEntity>,
  ) {}

  async findAll() {
    const products = await this.productRepository.find();

    return products;
  }

  async findManyByIds(arrayOfIds: Array<string>) {
    const products = await this.productRepository
      .createQueryBuilder()
      .where('id IN(:...arrayOfIds)', { arrayOfIds })
      .getMany();

    return products;
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`There is no user under id ${id}`);
    }

    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const { quantity, ...productData } = createProductDto;
    const product = await this.productRepository.create(productData);
    const savedProduct = await this.productRepository.save(product);

    const stock = await this.stockRepository.create({
      product: savedProduct,
      quantity: quantity || 1,
    });
    const savedStock = await this.stockRepository.save(stock);
    delete savedStock.product;

    return { ...savedProduct, stock: savedStock };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException(`There is no product under id ${id}`);
    }

    let stock: StockEntity;
    if (updateProductDto.quantity) {
      const productOne = await this.productRepository.findOne({
        where: { id },
      });

      const stockOne = await this.stockRepository.findOne({
        where: { id: productOne.stock.id },
      });
      stockOne.quantity = updateProductDto.quantity;
      stock = await this.stockRepository.save(stockOne);
      delete product.stock;
    }

    const updateProduct = await this.productRepository.save(product);
    return { product: { ...updateProduct, stock } };
  }

  async remove(id: string) {
    const product = await this.findOne(id);

    return this.productRepository.remove(product);
  }
}
