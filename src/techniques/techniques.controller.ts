import { Controller, Post, Body } from '@nestjs/common';
import { TechniquesService } from './techniques.service';
import { Technique } from './techniques.entity';

@Controller('techniques')
export class TechniquesController {
  constructor(private readonly service: TechniquesService) {}

  @Post()
  create(@Body() body: Technique) {
    return this.service.create(body);
  }
}
