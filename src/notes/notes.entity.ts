import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../categories/categories.entity';
import { Position } from '../positions/positions.entity';
import { Teacher } from '../teachers/teachers.entity';
import { Technique } from '../techniques/techniques.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('int')
  categoryId: number;

  @Column('int')
  positionId: number;

  @Column('int')
  teacherId: number;

  @Column('int')
  techniqueId: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @ManyToOne(type => Category)
  @JoinColumn({ name: 'catergoryId' })
  category: Category;

  @ManyToOne(type => Position)
  @JoinColumn({ name: 'positionId' })
  position: Position;

  @ManyToOne(type => Teacher)
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;

  @ManyToOne(type => Technique)
  @JoinColumn({ name: 'techniqueId' })
  technique: Technique;
}
