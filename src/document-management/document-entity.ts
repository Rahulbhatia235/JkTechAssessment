import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  filePath: string;

  @CreateDateColumn()
  createdAt: Date;
}
