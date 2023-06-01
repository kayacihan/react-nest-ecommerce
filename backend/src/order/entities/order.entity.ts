import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { OrdersProductsEntity } from './orders-products.entity';
import { UserEntity } from '@app/user/user.entity';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  address: string;

  @Column('decimal', {
    precision: 8,
    scale: 2,
  })
  price: number;

  @Column({ length: 25 })
  date: string;

  @Column({ length: 50 })
  status: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.orders)
  user: UserEntity;

  @Column({ name: 'user_id' })
  userId: number;

  @OneToMany(
    () => OrdersProductsEntity,
    (OrdersProducts: OrdersProductsEntity) => OrdersProducts.order,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  OrdersProducts: OrdersProductsEntity[];
}
