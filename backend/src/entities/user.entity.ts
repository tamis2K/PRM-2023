import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 50 })
  fullname: string;
  @Column({ nullable: false, length: 20 })
  username: string;
  @Column({ length: 250 })
  description: string;
  @Column({ nullable: false, length: 20 })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
