import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { Video } from './videos.entity';
import { DeleteResult } from 'typeorm';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  async findAll(): Promise<Video[]> {
    return this.videosService.findAll();
  }

  @Post()
  async create(@Body() body: Video): Promise<Video> {
    return this.videosService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Video): Promise<Video> {
    return this.videosService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.videosService.delete(id);
  }
}
