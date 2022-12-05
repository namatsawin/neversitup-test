import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import OrderItemEntity from './order-item.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: String })
  name: string;

  @Column({ type: String, nullable: true })
  description: string;

  @Column({ type: Number })
  price: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;

  // Joining
  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
  orderItems!: OrderItemEntity[];
}

export default ProductEntity;
