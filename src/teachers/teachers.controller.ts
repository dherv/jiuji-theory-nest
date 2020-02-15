import { Controller, Post, Body, Get } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { Teacher } from './teachers.entity';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  findAll() {
    return this.teachersService.findAll();
  }

  @Post()
  create(@Body() body: Teacher) {
    return this.teachersService.create(body);
  }
}
