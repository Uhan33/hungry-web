import { jest } from '@jest/globals';
import { PointRepository } from '../../../src/repositories/point.repository.js';

let mockPrisma = {
  point: {
    create: jest.fn(),
    findUserById: jest.fn(),
  },
};

let pointRepository = new PointRepository(mockPrisma);
describe('Point Repository Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('포인트 생성', () => {
    test('생성 성공', async () => {
      const samplePoint = {
        userId: 1,
        money: 1000000,
      };
      mockPrisma.point.create.mockResolvedValue(samplePoint);
      const addPoint = await pointRepository.signUpPoint(samplePoint.userId);
      expect(addPoint).toBe(samplePoint);
    });
  });
});
