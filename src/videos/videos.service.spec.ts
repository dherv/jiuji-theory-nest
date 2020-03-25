import { Test, TestingModule } from '@nestjs/testing';
import { VideosService } from './videos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Video } from './videos.entity';

describe('VideosService', () => {
  let service: VideosService;

  beforeEach(async () => {
    const mockRepository = () => ({
      save: jest.fn(),
      find: jest.fn(),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideosService,
        {
          provide: getRepositoryToken(Video),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    service = await module.resolve(VideosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
