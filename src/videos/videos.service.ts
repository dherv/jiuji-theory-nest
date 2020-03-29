import { Injectable, Scope, Inject } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { Video } from './videos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { RequestUser } from '../auth/user.interface';
import { google } from 'googleapis';
import { VideosSearchBodyDto } from './dto/videos-search-body.dto';
import { VideosSearchResultDto } from './dto/videos-search-result.dto';
import { IVideo } from './interfaces/video.interface';

@Injectable({ scope: Scope.REQUEST })
export class VideosService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectRepository(Video)
    private readonly repository: Repository<Video>,
  ) {}

  async findAll(): Promise<Video[]> {
    const user = this.request.user as RequestUser;
    return this.repository.find({
      where: { userId: user.id },
      relations: ['notes'],
      order: { updatedAt: 'DESC' },
    });
  }

  async create(body: IVideo): Promise<Video> {
    const user = this.request.user as RequestUser;
    return this.repository.save({ ...body, userId: user.id });
  }

  async update(id: number, body: IVideo): Promise<Video> {
    const user = this.request.user as RequestUser;
    return this.repository.save({
      ...body,
      id: Number(id),
      userId: user.id,
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  async search(body: VideosSearchBodyDto): Promise<VideosSearchResultDto[]> {
    const { q, maxResults } = body;
    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.GOOGLE_API_YOUTUBE_KEY,
    });

    const searchCallback = (err: Error, response, resolve, reject) => {
      if (err) {
        return reject('Error: ' + err);
      }
      const {
        data: { items },
      } = response;

      const youtubeVideos = items.map(video => ({
        youtubeId: video.id.videoId,
        title: video.snippet.title,
        description: video.snippet.description,
      }));
      return resolve(youtubeVideos);
    };

    return new Promise((resolve, reject) => {
      return youtube.search.list(
        {
          q,
          part: 'snippet',
          maxResults,
        },
        (err, response) => searchCallback(err, response, resolve, reject),
      );
    });
  }
}
