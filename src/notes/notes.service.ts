import { Injectable, Scope, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './notes.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { RequestUser } from '../auth/user.interface';

@Injectable({ scope: Scope.REQUEST })
export class NotesService {
  private readonly user;
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectRepository(Note)
    private readonly repository: Repository<Note>,
  ) {}

  async findAll(): Promise<Note[]> {
    const user = this.request.user as RequestUser;
    return this.repository.find({
      where: { userId: user.id },
      relations: ['noteItems'],
      order: { date: 'DESC' },
    });
  }

  async create(body: Note) {
    const user = this.request.user as RequestUser;
    const newElement = this.repository.create({
      ...body,
      userId: user.id,
    });
    return this.repository.save(newElement);
  }
}
