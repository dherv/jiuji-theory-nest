import { Controller, Post, Body } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Location } from './locations.entity';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  async create(@Body() body: Location) {
    return this.locationsService.create(body);
  }
}
