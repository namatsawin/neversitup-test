import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: String, unique: true })
  username: string;

  @Column({ type: String, select: false })
  password: string;

  @Column({ type: String, select: false })
  salt: string;

  @Column({ type: String, unique: true })
  email: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}

export default UserEntity;
