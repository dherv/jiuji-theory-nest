import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesController } from './notes/notes.controller';
import { NotesService } from './notes/notes.service';
import { CategoriesController } from './categories/categories.controller';
import { PositionsController } from './positions/positions.controller';
import { TeachersController } from './teachers/teachers.controller';
import { TechniquesController } from './techniques/techniques.controller';
import { ClubsController } from './clubs/clubs.controller';
import { LocationsController } from './locations/locations.controller';
import { Note } from './notes/notes.entity';
import { Category } from './categories/categories.entity';
import { Technique } from './techniques/techniques.entity';
import { Position } from './positions/positions.entity';
import { Teacher } from './teachers/teachers.entity';
import { Club } from './clubs/clubs.entity';
import { Location } from './locations/locations.entity';
import { LocationsService } from './locations/locations.service';
import { ClubsService } from './clubs/clubs.service';
import { TeachersService } from './teachers/teachers.service';
import { CategoriesService } from './categories/categories.service';
import { PositionsService } from './positions/positions.service';
import { TechniquesService } from './techniques/techniques.service';
import { NoteItemsController } from './note-items/note-items.controller';
import { NoteItemsService } from './note-items/note-items.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      Note,
      Category,
      Technique,
      Position,
      Teacher,
      Club,
      Location,
    ]),
    AuthModule,
  ],
  controllers: [
    AppController,
    NotesController,
    CategoriesController,
    PositionsController,
    TeachersController,
    TechniquesController,
    ClubsController,
    LocationsController,
    NoteItemsController,
  ],
  providers: [
    AppService,
    NotesService,
    LocationsService,
    ClubsService,
    TeachersService,
    CategoriesService,
    PositionsService,
    TechniquesService,
    NoteItemsService,
  ],
})
export class AppModule {}
