import { Technique } from '../../techniques/techniques.entity';
import { Category } from '../../categories/categories.entity';
import { Position } from '../../positions/positions.entity';
import { Note } from '../../notes/notes.entity';

export class VideosDto {
  id: number;
  youtubeId: string;
  title: string;
  description: string;
  position?: Position;
  technique?: Technique;
  category?: Category;
  notes?: Note[];
  updatedAt?: Date;
  createdAt?: Date;
}
