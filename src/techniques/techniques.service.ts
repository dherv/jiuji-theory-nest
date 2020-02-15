import { Injectable } from '@nestjs/common';
import { Technique } from './techniques.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TechniquesService {
  constructor(
    @InjectRepository(Technique)
    private readonly techniqueRepository: Repository<Technique>,
  ) {}

  findAll() {
    return this.techniqueRepository.find();
  }

  create(body: Technique) {
    return this.techniqueRepository.save(body);
  }
}
