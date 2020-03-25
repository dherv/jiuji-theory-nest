import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from '../categories/categories.entity';
import { Position } from '../positions/positions.entity';
import { Teacher } from '../teachers/teachers.entity';
import { Technique } from '../techniques/techniques.entity';
import { NoteItem } from '../note-items/note-items.entity';
import { Video } from '../videos/videos.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column({ length: 500 })
  name: string;

  @Column({ nullable: true })
  variant: number;

  @Column('int')
  categoryId: number;

  @Column('int')
  positionId: number;

  @Column('int')
  teacherId: number;

  @Column('int')
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

  @ManyToOne(type => Teacher)
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;

  @ManyToOne(type => Technique)
  @JoinColumn({ name: 'techniqueId' })
  technique: Technique;

  @OneToMany(
    type => NoteItem,
    noteItem => noteItem.note,
    { cascade: ['insert', 'update', 'remove'] },
  )
  noteItems: NoteItem[];

  @ManyToMany(
    type => Video,
    video => video.notes,
    { cascade: ['insert', 'update'] },
  )
  @JoinTable()
  videos: Video[];
}
