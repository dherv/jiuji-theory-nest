import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { Category } from '../categories/categories.entity';
import { Position } from '../positions/positions.entity';
import { Technique } from '../techniques/techniques.entity';
import { Note } from '../notes/notes.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  youtubeId: string;

  @Column({ nullable: true })
  categoryId: number;

  @Column({ nullable: true })
  positionId: number;

  @Column({ nullable: true })
  techniqueId: number;

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

  @ManyToMany(
    type => Note,
    note => note.videos,
    { cascade: ['insert', 'update'] },
  )
  notes: Note[];
}
