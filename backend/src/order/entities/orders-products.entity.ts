import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  Repository,
} from 'typeorm';

import { OrderEntity } from './order.entity';
import { StockEntity } from '@app/product/enities/product-stock.entity';
import { ProductEntity } from '@app/product/enities/product.entity';

@Entity()
export class OrdersProductsEntity {
  constructor(private readonly stockRepository: Repository<StockEntity>) {}
  @PrimaryColumn()
  orderId: string;

  @ManyToOne((type) => OrderEntity, (order) => order.OrdersProducts)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;

  @PrimaryColumn()
  productId: string;

  @ManyToOne((type) => ProductEntity, (product) => product.OrdersProducts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @Column()
  quantity: number;

  @Column('decimal', {
    precision: 8,
    scale: 2,
  })
  price: number;
}
