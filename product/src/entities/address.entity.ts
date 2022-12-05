import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import UserEntity from './user.entity';

@Entity({ name: 'addresses' })
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: String, nullable: false })
  phone: string;

  @Column({ type: String })
  address: string;

  @Column({ type: String, nullable: false })
  subdistrict: string;

  @Column({ type: String, nullable: false })
  district: string;

  @Column({ type: String, nullable: false })
  province: string;

  @Column({ type: String, nullable: false })
  zipcode: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;

  // Joining
  @ManyToOne(() => UserEntity, (user) => user.addresses)
  user!: UserEntity;
}

export default AddressEntity;
