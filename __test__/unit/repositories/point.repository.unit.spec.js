import { jest } from '@jest/globals';
import { PointRepository } from '../../../src/repositories/point.repository.js';

let mockPrisma = {
  point: {
    findUserById: jest.fn(),
    update: jest.fn(),
  },
};

let pointRepository = new PointRepository(mockPrisma);
describe('Point Repository Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('포인트 생성', () => {
    test('생성 추가', async () => {
      const samplePoint = {
        userId: 1,
        money: 1000000,
      };
      mockPrisma.point.update.mockResolvedValue(samplePoint);
      const addPoint = await pointRepository.signUpPoint(samplePoint.userId);
      expect(addPoint).toEqual(samplePoint);
    });
  });
});
