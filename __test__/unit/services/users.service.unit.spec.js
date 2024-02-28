import { UsersService } from '../../../src/services/user.service';
import { jest } from '@jest/globals';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
let mockRepository = {
  createUser: jest.fn(),
  loginUser: jest.fn(),
  findByUserEmail: jest.fn(),
};

let usersService = new UsersService(mockRepository);

describe('User Service Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe('유저 생성', () => {
    test('유저 성공적으로 생성', async () => {
      const email = 'test@example.com';
      const name = 'Test User';
      const password = 'testpassword';
      const addr = 'Test Address';
      const number = '010-1234-6678';
      const role = 'user';
      const userId = 1;

      // 성공 사례이니까
      mockRepository.findByUserEmail.mockResolvedValue(null);

      // bcrypt
      bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');

      // repository에 createUser 메소드가 성공하면
      const createdUser = {
        email,
        name,
        addr,
        number,
        role,
        userId: 1,
      };
      mockRepository.createUser.mockResolvedValue(createdUser);

      // 유저 생성 함수 호출
      const result = await usersService.createUser(email, name, password, password, addr, number, role);

      // 생성된 유저와 반환된 결과 비교
      expect(result).toEqual({
        userId: createdUser.userId,
        email: createdUser.email,
        name: createdUser.name,
        addr: createdUser.addr,
        number: createdUser.number,
        role: createdUser.role,
      });

      expect(mockRepository.findByUserEmail).toHaveBeenCalledWith(email);

      // bcrypt 해싱
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);

      // createUser 메소드
      expect(mockRepository.createUser).toHaveBeenCalledWith(email, name, 'hashedPassword', addr, number, role);
    });
    test('email이 중복일 때', async () => {
      const email = 'test@example.com';
      const name = 'Test User';
      const password = 'testpassword';
      const addr = 'Test Address';
      const number = '010-1234-6678';
      const role = 'user';

      mockRepository.findByUserEmail.mockResolvedValue(email);
      try {
        await usersService.createUser(email, name, password, addr, number, role);
      } catch (error) {
        expect(error.message).toEqual('이미 존재하는 email입니다.');
      }
    });
  });

  describe('유저 로그인', () => {
    test('유저 로그인 성공', async () => {
      const email = 'test@example.com';
      const password = 'testpassword';
      const sampleUser = {
        userId: 1,
        email,
        password: await bcrypt.hash(password, 10),
      };

      mockRepository.loginUser.mockResolvedValue(sampleUser);

      jwt.sign = jest.fn().mockReturnValue('mockedToken');

      bcrypt.compare = jest.fn().mockResolvedValue(true);

      const loggedInUser = await usersService.loginUser(email, password);

      expect(jwt.sign).toHaveBeenCalledWith({ userId: sampleUser.userId }, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: '12h',
      });
      expect(jwt.sign).toHaveBeenCalledWith({ userId: sampleUser.userId }, process.env.REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: '7d',
      });

      expect(loggedInUser).toHaveProperty('accessToken', 'mockedToken');
      expect(loggedInUser).toHaveProperty('refreshToKen', 'mockedToken');
    });

    test('이메일이나 비밀번호가 일치하지 않을 때', async () => {
      const email = 'test@example.com';
      const password = 'testpassword';
      const point = 1000000;

      mockRepository.loginUser.mockResolvedValue(email, password, point);

      try {
        await usersService.loginUser(email, password);
      } catch (error) {
        expect(error.message).toEqual('이메일이나 비밀번호가 올바르지 않습니다.');
      }
    });
  });
});
