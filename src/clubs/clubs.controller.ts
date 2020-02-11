import { Controller, Post, Body } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { Club } from './clubs.entity';

@Controller('clubs')
export class ClubsController {
  constructor(private readonly service: ClubsService) {}

  @Post()
  create(@Body() body: Club) {
    return this.service.create(body);
  }
}
