import { Controller, Post, Body } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { Position } from './positions.entity';

@Controller('positions')
export class PositionsController {
  constructor(private readonly service: PositionsService) {}

  @Post()
  create(@Body() body: Position) {
    return this.service.create(body);
  }
}
