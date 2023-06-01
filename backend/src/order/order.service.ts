import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Status } from './enums/status.enum';

import { OrderEntity } from './entities/order.entity';
import { OrdersProductsEntity } from './entities/orders-products.entity';

import { CreateOrderDto, ProductDto } from '../order/dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { ProductEntity } from '@app/product/enities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrdersProductsEntity)
    private readonly ordersProductsRepository: Repository<OrdersProductsEntity>,
    private readonly productService: ProductService,
  ) {}

  async findAll() {
    const orders = await this.orderRepository.find();
    return orders;
  }

  async findAllByUserId(id: number) {
    const orders = await this.orderRepository.find({
      where: {
        userId: id,
      },
    });

    if (!orders) {
      throw new NotFoundException(`This user doesn't have any orders`);
    }

    return orders;
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['OrdersProducts'],
    });

    if (!order) {
      throw new NotFoundException(`Order under this id doesn't exist`);
    }

    return order;
  }

  async create(userId: number, createOrderDto: CreateOrderDto) {
    const status = Status.FINISHED;
    const productsDto = createOrderDto.products;

    const productsIds = productsDto.map((current) => current.id);
    const productsMap = this.createProductQuantityMap(productsDto);

    const products = await this.productService.findManyByIds(productsIds);
    const price = await this.getTotalPrice(products, productsMap);

    const order = await this.orderRepository.create({
      ...createOrderDto,
      userId,
      status,
      price,
    });

    const savedOrder = await this.orderRepository.save(order);

    const ordersProducts = products.map((product) => ({
      orderId: savedOrder.id,
      productId: product.id,
      price: product.price,
      quantity: productsMap.get(product.id),
    }));

    await this.ordersProductsRepository.save(ordersProducts);

    return savedOrder.id;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.preload({
      id,
      ...updateOrderDto,
    });

    if (!order) {
      throw new NotFoundException(`There is no order under id ${id}`);
    }

    return this.orderRepository.save(order);
  }

  async remove(id: string) {
    const order = await this.findOne(id);

    return this.orderRepository.remove(order);
  }

  private async getTotalPrice(
    products: Array<ProductEntity>,
    productsMap: Map<string, number>,
  ) {
    const price = products.reduce(
      (sum, current) => sum + +current.price * productsMap.get(current.id),
      0,
    );

    return price;
  }

  private createProductQuantityMap(productsDto: Array<ProductDto>) {
    const productsMap = new Map<string, number>(); //productId -> quantity

    for (const product of productsDto) {
      const { id, quantity } = product;

      productsMap.set(id, quantity);
    }

    return productsMap;
  }
}
