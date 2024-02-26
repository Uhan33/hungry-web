import { jest } from '@jest/globals';
import { UsersRepository } from '../../../src/repositories/user.repositiry.js';
import { expect } from '@jest/globals';

let mockPrisma = {
  users: {
    create: jest.fn(),
    findFirst: jest.fn(),
  },
};

let usersRepository = new UsersRepository(mockPrisma);
describe('Users Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('유저 생성', () => {
    test('유저 생성 성공', async () => {
      const createdUser = {
        email: 'test@test.com',
        name: '홍길동',
        password: '123456',
        addr: '청주시',
        number: '010-1234-5678',
        role: 'owner',
        point: 1,
      };
      mockPrisma.users.create.mockReturnValue(createdUser)
      const create = await usersRepository.createUser(createdUser) 
      expect(create).toEqual(createdUser)
    });
  });
});
