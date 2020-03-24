import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from '../categories/categories.entity';
import { Position } from '../positions/positions.entity';
import { Technique } from '../techniques/techniques.entity';
import { Note } from '../notes/notes.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  youtubeId: string;

  @Column({ nullable: true })
  noteId: number;

  @Column({ nullable: true })
  categoryId: number;

  @Column({ nullable: true })
  positionId: number;

  @Column({ nullable: true })
  techniqueId: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @ManyToOne(type => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(type => Position)
  @JoinColumn({ name: 'positionId' })
  position: Position;

  @ManyToOne(type => Technique)
  @JoinColumn({ name: 'techniqueId' })
  technique: Technique;

  @ManyToMany(type => Note, { cascade: true })
  @JoinTable()
  notes: Note[];
}
