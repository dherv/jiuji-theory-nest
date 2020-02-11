import { Injectable } from '@nestjs/common';
import { Location } from './locations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly repository: Repository<Location>,
  ) {}

  create(body: Location) {
    return this.repository.save(body);
  }
}
