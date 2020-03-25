export class VideosUtils {
  static sample = {
    id: 1,
    youtubeId: '1',
    title: 'title',
    positionId: 1,
    techniqueId: 1,
    categoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    position: null,
    category: null,
    technique: null,
    notes: [],
  };
  static mockRepository = jest.fn(() => ({
    metadata: {
      columns: [],
      relations: [],
    },
  }));
}
