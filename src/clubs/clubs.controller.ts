import { Controller, Post, Body, Get } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { Club } from './clubs.entity';

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Get()
  findAll() {
    return this.clubsService.findAll();
  }
  @Post()
  create(@Body() body: Club) {
    return this.clubsService.create(body);
  }
}
