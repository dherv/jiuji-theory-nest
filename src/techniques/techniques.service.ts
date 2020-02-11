import { Injectable } from '@nestjs/common';
import { Technique } from './techniques.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TechniquesService {
  constructor(
    @InjectRepository(Technique)
    private readonly repository: Repository<Technique>,
  ) {}

  create(body: Technique) {
    return this.repository.save(body);
  }
}
