import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity()
export class StockEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @OneToOne(() => ProductEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  product: ProductEntity;
}
