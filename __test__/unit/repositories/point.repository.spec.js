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
    test('생성 성공', async () => {});
  });
});
