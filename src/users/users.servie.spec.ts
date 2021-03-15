import { UserService } from './uesrs.services';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Verification } from './entities/verification.entity';
import { JwtService } from '../jwt/jwt.service';
import { MailService } from '../mail/mail.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

// 가짜함수
const mockRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
};

const mockJwtService = {
  verify: jest.fn(),
  sign: jest.fn(),
};

const mockMailService = {
  sendVerificationEmail: jest.fn(),
};

type MockRepository<T = any> = Partial<
  Record<keyof Repository<User>, jest.Mock>
>;

describe('UserService', () => {
  let service: UserService;
  let usersRepository: MockRepository<User>;

  beforeAll(async () => {
    const modules = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Verification),
          useValue: mockRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();
    service = modules.get<UserService>(UserService);
    usersRepository = modules.get(getRepositoryToken(User));
  });

  it('be definded', () => {
    expect(service).toBeDefined();
  });

  describe('createAccount', () => {
    it('sould fail if user exists', async () => {
      usersRepository.findOne.mockRejectedValue({
        //jest가 중간에 findOne 함수를 가로채서 반환값을 속임 findone은 typeorm을 써야하고 sql코드를 써야함
        id: 7,
        email: 'lalalaee@lolololo.com',
      });
      const result = await service.createAccount({
        email: '',
        password: '',
        role: 0,
      });
      expect(result).toMatchObject({
        ok: false,
        error: 'There is a user with that email already',
      });
    });
  });
  it.todo('login');
  it.todo('findById');
  it.todo('editProfile');
  it.todo('verifyEmail');
});
