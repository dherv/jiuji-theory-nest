import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { Video as VideoEntity } from './videos.entity';
import { DeleteResult } from 'typeorm';
import { VideosSearchBodyDto } from './dto/videos-search-body.dto';
import { VideosSearchResultDto } from './dto/videos-search-result.dto';
import { VideosDto } from './dto/videos.dto';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  async findAll(): Promise<VideoEntity[]> {
    return this.videosService.findAll();
  }

  @Post()
  async create(@Body() body: VideosDto): Promise<VideoEntity> {
    return this.videosService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() body: VideosDto,
  ): Promise<VideoEntity> {
    return this.videosService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.videosService.delete(id);
  }

  @Post('/search')
  @HttpCode(200)
  async search(
    @Body() body: VideosSearchBodyDto,
  ): Promise<VideosSearchResultDto[]> {
    return this.videosService.search(body);
  }
}
