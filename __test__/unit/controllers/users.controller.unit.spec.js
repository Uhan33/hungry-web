import { jest } from '@jest/globals';
import { UsersController } from '../../../src/controllers/user.controller.js';
import { expect } from '@jest/globals';

describe('UserManagement', () => {
  // 사전에 필요한 mock 데이터 세팅
  let mockReq;
  let mockRes;
  let mockNext;
  let usersController;
  let mockUserService;
  beforeEach(() => {
    jest.resetAllMocks();
    mockUserService = {
      createUser: jest.fn(),
      loginUser: jest.fn(),
    };
    mockReq = { params: {}, body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
    usersController = new UsersController(mockUserService);
  });

  describe('유저 생성', () => {
    test('성공적으로 생성', async () => {
      const createdUser = {
        email: 'test14@naver.com',
        name: '최하온',
        password: '123456',
        confirmPassword: '123456',
        addr: '청주시',
        number: '010-1234-5623',
        role: 'owner',
      };
      mockReq.body = createdUser;

      mockUserService.createUser.mockResolvedValue(createdUser);

      await usersController.userSignUp(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ data: createdUser });
      expect(mockUserService.createUser).toHaveBeenCalledWith(
        createdUser.email,
        createdUser.name,
        createdUser.password,
        createdUser.confirmPassword,
        createdUser.addr,
        createdUser.number,
        createdUser.role
      );
    });
    test('body에 데이터가 누락 시', async () => {
      mockReq.body = {};
      await usersController.userSignUp(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: '필수 값을 입력하지 않았습니다.' });
    });
    test('비밀 번호와 비밀번호 확인이 일치하지 않을 시', async () => {
      mockReq.body = {
        email: 'test14@naver.com',
        name: '최하온',
        password: '123456',
        confirmPassword: '123457',
        addr: '청주시',
        number: '010-1234-5623',
        role: 'owner',
      };

      await usersController.userSignUp(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' });
    });
    test('권한이 올바르지 않을 시', async () => {
      mockReq.body = {
        email: 'test14@naver.com',
        name: '최하온',
        password: '123456',
        confirmPassword: '123456',
        addr: '청주시',
        number: '010-1234-5623',
        role: 'admin',
      };

      await usersController.userSignUp(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: '올바르지 않은 권한입니다.' });
    });
    test('이메일 형식이 일치하지 않을 시', async () => {
      mockReq.body = {
        email: 'test14naver.com',
        name: '최하온',
        password: '123456',
        confirmPassword: '123456',
        addr: '청주시',
        number: '010-1234-5623',
        role: 'owner',
      };

      await usersController.userSignUp(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: '이메일 형식이 올바르지 않습니다.' });
    });
    test('전화 번호 형식이 일치하지 않을 시', async () => {
      mockReq.body = {
        email: 'test14@naver.com',
        name: '최하온',
        password: '123456',
        confirmPassword: '123456',
        addr: '청주시',
        number: '01012345623',
        role: 'owner',
      };

      await usersController.userSignUp(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: '전화번호 형식이 올바르지 않습니다.' });
    });
  });

  describe('유저 로그인', () => {
    test('로그인 성공 시', async () => {
        const loginUser = {
            email: 'test14@naver.com',
            password: '123456',
        }
      mockReq.body = loginUser

      mockUserService.loginUser.mockResolvedValue(loginUser);

      await mockUserService.loginUser(mockReq, mockRes, mockNext)

      expect(mockRes.status).toHaveBeenCalledWith(201);
    //   expect(mockRes.json).toHaveBeenCalledWith({data: loginUser})
    //   expect(mockUserService.loginUser).toHaveBeenCalledWith(
    //     loginUser.email,
    //     loginUser.password)
    });
  });
});
