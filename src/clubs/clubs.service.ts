import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Club } from './clubs.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club)
    private readonly repository: Repository<Club>,
  ) {}

  create(body: Club) {
    return this.repository.save(body);
  }
}
