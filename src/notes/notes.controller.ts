import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
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

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Note) {
    return this.notesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} note`;
  }
}
