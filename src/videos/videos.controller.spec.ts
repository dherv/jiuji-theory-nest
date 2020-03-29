import { Test, TestingModule } from '@nestjs/testing';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { Video } from './videos.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ContextIdFactory } from '@nestjs/core';
import { VideosUtils } from './videos.utils';
import { DeleteResult } from 'typeorm';
import { VideosSearchResultDto } from './dto/videos-search-result.dto';

describe('Videos', () => {
  let videosController: VideosController;
  let videosService: VideosService;

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideosController],
      providers: [
        { provide: VideosService, useClass: VideosService },
        {
          provide: getRepositoryToken(Video),
          useValue: VideosUtils.mockRepository,
        },
      ],
    }).compile();
    const contextId = ContextIdFactory.getByRequest(null);

    videosController = await module.resolve<VideosController>(
      VideosController,
      contextId,
    );
    videosService = await module.resolve<VideosService>(
      VideosService,
      contextId,
    );
  });

  describe('controller', () => {
    it('should be defined', () => {
      expect(videosController).toBeDefined();
    });

    it('should find and return an array of videos', async () => {
      const result = [{ ...VideosUtils.sample }];
      const resultPromise: Promise<Video[]> = Promise.resolve(result);
      jest
        .spyOn(videosService, 'findAll')
        .mockImplementation(() => resultPromise);

      expect(await videosController.findAll()).toBe(result);
      expect(videosService.findAll).toHaveBeenCalled();
    });

    it('should insert a video', async () => {
      const resultPromise: Promise<Video> = Promise.resolve(VideosUtils.sample);
      jest
        .spyOn(videosService, 'create')
        .mockImplementation(() => resultPromise);
      expect(await videosController.create(VideosUtils.sample)).toBe(
        VideosUtils.sample,
      );
      expect(videosService.create).toHaveBeenCalled();
    });

    it('should update a video', async () => {
      const resultPromise: Promise<Video> = Promise.resolve(VideosUtils.sample);
      jest
        .spyOn(videosService, 'update')
        .mockImplementation(() => resultPromise);
      expect(await videosController.update(1, VideosUtils.sample)).toBe(
        VideosUtils.sample,
      );
      expect(videosService.update).toHaveBeenCalled();
    });

    it('should delete a video', async () => {
      const resultRemove = {
        raw: null,
        affected: null,
      };
      const resultPromise: Promise<DeleteResult> = Promise.resolve(
        resultRemove,
      );
      jest
        .spyOn(videosService, 'delete')
        .mockImplementation(() => resultPromise);
      expect(await videosController.remove(1)).toBe(resultRemove);
      expect(videosService.delete).toHaveBeenCalled();
    });

    it('should search videos', async () => {
      const resultPromise: Promise<VideosSearchResultDto[]> = Promise.resolve([
        VideosUtils.searchResultSample,
        VideosUtils.searchResultSample,
      ]);
      jest
        .spyOn(videosService, 'search')
        .mockImplementation(() => resultPromise);
      expect(
        await videosController.search(VideosUtils.searchBodySample),
      ).toEqual([
        VideosUtils.searchResultSample,
        VideosUtils.searchResultSample,
      ]);
      expect(videosService.search).toHaveBeenCalled();
    });
  });
});
