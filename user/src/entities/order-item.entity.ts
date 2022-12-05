import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import OrderEntity from './order.entity';
import ProductEntity from './product.entity';

@Entity({ name: 'order_items' })
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: Number })
  quantity!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;

  // Joining
  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  order!: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderItems)
  product!: ProductEntity;
}

export default OrderItemEntity;
