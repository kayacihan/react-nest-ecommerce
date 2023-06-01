import {
  AfterInsert,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';

import { StockEntity } from './product-stock.entity';
import { OrdersProductsEntity } from '@app/order/entities/orders-products.entity';

@Entity()
export class ProductEntity {
  //constructor(private readonly stockRepository: Repository<StockEntity>) {}

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column('decimal', {
    precision: 8,
    scale: 2,
  })
  price: number;

  @Column()
  photo: string;

  @Column({ length: 255 })
  description: string;

  @OneToMany(
    () => OrdersProductsEntity,
    (OrdersProducts: OrdersProductsEntity) => OrdersProducts.product,
  )
  OrdersProducts: OrdersProductsEntity[];

  @OneToOne(() => StockEntity, (stock) => stock.product, {
    eager: true,
    onDelete: 'CASCADE',
  })
  stock: StockEntity;

  // @AfterInsert()
  // async createStock(): Promise<void> {
  //   const stock = new StockEntity();
  //   stock.product = this;
  //   stock.quantity = 1;
  //   await this.stockRepository.save(stock);
  // }
}
