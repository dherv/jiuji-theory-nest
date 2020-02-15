import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Club } from './clubs.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club)
    private readonly clubRepository: Repository<Club>,
  ) {}

  findAll() {
    return this.clubRepository.find();
  }

  create(body: Club) {
    return this.clubRepository.save(body);
  }
}
