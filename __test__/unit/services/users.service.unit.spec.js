import { UsersService } from '../../../src/services/user.service';
import { jest } from '@jest/globals';
import bcrypt from 'bcrypt';
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
      const newUser = {
        email: 'email2@email.com',
        name: 'name',
        password: '123456',
        addr: '청주시',
        number: '010-2222-3333',
        role: 'owner',
      };

      const hashedPassword = await bcrypt.hash(newUser.password, 10);

      const createdUser = {
        ...newUser,
        password: hashedPassword,
        point: 1000,
      };

      mockRepository.findByUserEmail.mockReturnValue(null);
      mockRepository.createUser.mockReturnValue(createdUser);

      const result = await usersService.createUser(
        newUser.email,
        newUser.name,
        newUser.password,
        newUser.addr,
        newUser.number,
        newUser.role
      );

      expect(createdUser).toEqual(result);
      expect(mockRepository.findByUserEmail).toHaveBeenCalledWith(newUser.email);
      expect(mockRepository.createUser).toHaveBeenCalledWith(
        newUser.email,
        newUser.name,
        hashedPassword,
        newUser.addr,
        newUser.number,
        newUser.role
      );
    });
  });
});
