import { Controller, Post, Body } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { Teacher } from './teachers.entity';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly service: TeachersService) {}

  @Post()
  create(@Body() body: Teacher) {
    return this.service.create(body);
  }
}
