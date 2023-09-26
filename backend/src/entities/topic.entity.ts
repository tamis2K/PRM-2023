import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 250 })
  content: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
