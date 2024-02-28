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
describe('User Repository Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('유저 생성', () => {
    test('유저 생성 성공', async () => {
      const userData = {
        email: 'email',
        name: 'name',
        password: '123456',
        addr: '청주시',
        number: '123456',
        role: 'owner',
      };
      const createdUser = {
        ...userData,
        point: {
          create: {
            money: 1000000,
          },
        },
      };
      mockPrisma.users.create.mockReturnValue(createdUser);
      const create = await usersRepository.createUser(
        userData.email,
        userData.name,
        userData.password,
        userData.addr,
        userData.number,
        userData.role
      );
      expect(create).toEqual(createdUser);
      expect(mockPrisma.users.create).toHaveBeenCalledWith({
        data: {
          ...userData,
        },
      });
    });
  });
  describe('유저 찾기', () => {
    test('유저 로그인', async () => {
      const userData = {
        email: 'test@test.com',
        password: '1234456',
      };
      const foundUser = {
        ...userData,
        point: {
          select: {
            money: true,
          },
        },
      };
      mockPrisma.users.findFirst.mockReturnValue(foundUser);
      const create = await usersRepository.loginUser(userData.email, userData.password);
      expect(create).toBe(foundUser);
      expect(mockPrisma.users.findFirst).toHaveBeenCalledWith({
        where: { email: userData.email },
        select: {
          email: true,
          password: true,
          point: {
            select: {
              money: true,
            },
          },
        },
      });
    });
    test('이메일 찾기', async () => {
      const emailUser = {
        userId: 1,
        email: 'email@email.com',
        password: '$2b$10$JIdRDvlv4QMpV6JvsSPKgeXm5vboCRLIpH9HBQFcTfg/RxQTIJ8Ri',
        name: 'name',
        addr: '청주시',
        number: '010-2222-3333',
        role: 'owner',
        createdAt: '2024-02-27T06:00:17.212Z',
      };
      mockPrisma.users.findFirst.mockReturnValue(emailUser);
      const findUser = await usersRepository.findByUserEmail(emailUser.email);
      expect(findUser).toBe(emailUser);
      expect(mockPrisma.users.findFirst).toHaveBeenCalledWith({ where: { email: emailUser.email } });
    });
  });
});
