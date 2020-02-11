import { Injectable } from '@nestjs/common';
import { Position } from './positions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private readonly repository: Repository<Position>,
  ) {}

  create(body: Position) {
    return this.repository.save(body);
  }
}
