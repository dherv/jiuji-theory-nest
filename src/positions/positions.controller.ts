import { Controller, Post, Body, Get } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { Position } from './positions.entity';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get()
  findAll() {
    return this.positionsService.findAll();
  }

  @Post()
  create(@Body() body: Position) {
    return this.positionsService.create(body);
  }
}
