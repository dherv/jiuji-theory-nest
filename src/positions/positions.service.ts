import { Injectable } from '@nestjs/common';
import { Position } from './positions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}

  findAll() {
    return this.positionRepository.find();
  }

  create(body: Position) {
    return this.positionRepository.save(body);
  }
}
