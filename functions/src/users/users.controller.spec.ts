import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    createUser: jest.fn().mockResolvedValue({ id: 'mockUserId', email: 'test@example.com' }),
    getUser: jest.fn().mockResolvedValue({ id: 'mockUserId', email: 'test@example.com' }),
    updateUser: jest.fn().mockResolvedValue({ id: 'mockUserId', email: 'updated@example.com' }),
    deleteUser: jest.fn().mockResolvedValue({ message: 'User deleted successfully' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = { email: 'test@example.com', password: 'password123' };
    const result = await controller.createUser(dto);

    expect(service.createUser).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ id: 'mockUserId', email: 'test@example.com' });
  });

  it('should get a user by ID', async () => {
    const result = await controller.getUser('mockUserId');

    expect(service.getUser).toHaveBeenCalledWith('mockUserId');
    expect(result).toEqual({ id: 'mockUserId', email: 'test@example.com' });
  });

  it('should update a user', async () => {
    const dto = { email: 'updated@example.com' };
    const result = await controller.updateUser('mockUserId', dto);

    expect(service.updateUser).toHaveBeenCalledWith('mockUserId', dto);
    expect(result).toEqual({ id: 'mockUserId', email: 'updated@example.com' });
  });

  it('should delete a user', async () => {
    const result = await controller.deleteUser('mockUserId');

    expect(service.deleteUser).toHaveBeenCalledWith('mockUserId');
    expect(result).toEqual({ message: 'User deleted successfully' });
  });
});
