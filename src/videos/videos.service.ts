import { Injectable, Scope, Inject } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { Video } from './videos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { RequestUser } from '../auth/user.interface';

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

  async create(body: Video): Promise<Video> {
    const user = this.request.user as RequestUser;
    return this.repository.save({ ...body, userId: user.id });
  }

  async update(id: number, body: Video): Promise<Video> {
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
}
