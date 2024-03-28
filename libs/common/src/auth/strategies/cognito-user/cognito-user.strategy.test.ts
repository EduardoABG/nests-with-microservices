import { Test, TestingModule } from '@nestjs/testing';
import { CognitoUserStrategy } from './cognito-user.strategy';
import { dbUser, payload } from './mocks/validate';
import { PrismaService } from '@app/common/prisma';
import { ConfigService } from '@nestjs/config';

describe('CognitoUserStrategy', () => {
  let strategy: CognitoUserStrategy;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CognitoUserStrategy,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn().mockResolvedValue(dbUser),
            },
          },
        },
        ConfigService,
      ],
    }).compile();

    strategy = module.get<CognitoUserStrategy>(CognitoUserStrategy);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return the cognitoUser and dbUser when user is found', async () => {
      const result = await strategy.validate(payload);
      expect(result).toEqual({ cognitoUser: payload, dbUser });
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { idRefAuth: payload.sub },
      });
    });
  });
});
