import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderEntity } from './entities/order.entity';

import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';

import { OrderController } from './order.controller';

import { OrderService } from './order.service';
import { OrdersProductsEntity } from './entities/orders-products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrdersProductsEntity]),
    ProductModule,
    UserModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
