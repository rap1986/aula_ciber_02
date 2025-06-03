import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('AppController', () => {
  let userController: UsersController;
  const mockUsersService = {
    search: () => [{}],
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService, // Usamos o nosso mock do serviço
        },
      ],
    }).compile();

    userController = app.get<UsersController>(UsersController);
  });

  describe('userController', () => {
    it('should return "Say Hello!!"', () => {
      expect(userController.sayHello()).toBe('Say Hello!');
    });

    it('should return []', () => {
      expect(userController.search('')).toHaveLength(0);
    });

    it('should return [{}]', () => {
      expect(userController.search('teste')).toHaveLength(1);
    });
  });
});
