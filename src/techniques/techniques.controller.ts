import { Controller, Post, Body, Get } from '@nestjs/common';
import { TechniquesService } from './techniques.service';
import { Technique } from './techniques.entity';

@Controller('techniques')
export class TechniquesController {
  constructor(private readonly techniquesServices: TechniquesService) {}

  @Get()
  findAll() {
    return this.techniquesServices.findAll();
  }

  @Post()
  create(@Body() body: Technique) {
    return this.techniquesServices.create(body);
  }
}
