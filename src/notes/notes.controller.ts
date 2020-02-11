import { Controller, Post, Body, Get } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './notes.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async create(@Body() body: Note) {
    return this.notesService.create(body);
  }

  @Get()
  async findAll(): Promise<Note[]> {
    return this.notesService.findAll();
  }
}
