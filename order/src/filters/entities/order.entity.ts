import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import OrderItemEntity from './order-item.entity';
import UserEntity from './user.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;

  // Joining
  @ManyToOne(() => UserEntity, (user) => user.orders)
  user!: UserEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.orders)
  orderItems!: OrderItemEntity[];
}

export default OrderEntity;
