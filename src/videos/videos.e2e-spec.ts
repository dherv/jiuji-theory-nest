import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { VideosService } from './videos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Video } from './videos.entity';
import { VideosController } from './videos.controller';
import { VideosUtils } from './videos.utils';

describe('Videos', () => {
  let app: INestApplication;
  const videosService = {
    findAll: () => ['test'],
    create: (body: Video) => ({ id: 'test' }),
    update: (body: Video) => ({ id: 'test' }),
    delete: (id: number) => ({ id: 'test' }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [VideosController],
      providers: [
        { provide: VideosService, useValue: videosService },
        {
          provide: getRepositoryToken(Video),
          useValue: VideosUtils.mockRepository,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET videos`, () => {
    return request(app.getHttpServer())
      .get('/videos')
      .expect(200)
      .expect(videosService.findAll());
  });

  it(`/POST videos`, () => {
    return request(app.getHttpServer())
      .post('/videos')
      .expect(201)
      .expect(videosService.create(VideosUtils.sample));
  });

  it(`/PUT videos`, () => {
    return request(app.getHttpServer())
      .put('/videos/1')
      .expect(200)
      .expect(videosService.update(VideosUtils.sample));
  });

  it(`/DELETE videos`, () => {
    return request(app.getHttpServer())
      .delete('/videos/1')
      .expect(200)
      .expect(videosService.delete(VideosUtils.sample.id));
  });

  afterAll(async () => {
    await app.close();
  });
});
