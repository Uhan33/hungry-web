import { jest } from '@jest/globals';
import { UsersRepository } from '../../../src/repositories/user.repositiry.js';
import { describe } from '@jest/globals';
import { beforeEach } from '@jest/globals';

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
        const createdUser ={
            
        }
        mockPrisma.users.create.mockReturnValue(mockReturn);
    
        // createUserParams Method를 실행하기 위해 필요한 Params 입니다.
        const createUserParams = {
          email: 'test@test.com',
          name: '최하온',
          password: 'hashpassword',
          confirmPassword: 'hashpassword',
          addr: '청주시',
          number: '010-1234-5678',
          role: 'onwer',
          point: {
            create: {
                money: 1000000
            }
        }
        };
    
        // usersRepository의 createPost Method를 실행합니다.
        const createUserData = await usersRepository.createUser(
            createUserParams.email,
            createUserParams.name,
            createUserParams.password,
            createUserParams.confirmPassword,
            createUserParams.addr,
            createUserParams.number,
            createUserParams.role,
        );    
        // createPostData는 prisma.posts의 create를 실행한 결과값을 바로 반환한 값인지 테스트합니다.
        expect(createUserData).toBe(mockReturn);
        expect(mockPrisma.users.create).toHaveBeenCalledWith({
            data: createUserParams,
          });
    });
  });
});
