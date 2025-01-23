import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { firestoreMock } from './__mocks__/firebase.config.mock';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {
          provide: 'FIRESTORE_INSTANCE',
          useValue: firestoreMock,
        }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clears mocks after each test
  });

  it('should create a user', async () => {
    const data = { email: 'test@example.com', password: 'password123' };

    // Call the service method
    const result = await service.createUser(data);

    // Assert Firestore interactions
    expect(firestoreMock.collection).toHaveBeenCalledWith('users'); // Ensure `collection` is called with 'users'
    expect(firestoreMock.collection().add).toHaveBeenCalledWith(data); // Ensure `add` is called with correct data

    // Assert the result
    expect(result).toEqual({ id: 'mockUserId', ...data });
  });

  it('should get a user by ID', async () => {
    const result = await service.getUser('mockUserId');

    expect(firestoreMock.collection).toHaveBeenCalledWith('users');
    expect(firestoreMock.collection().doc).toHaveBeenCalledWith('mockUserId');
    expect(result).toEqual({
      id: 'mockUserId',
      email: 'test@example.com',
      displayName: 'Test User',
    });
  });

  it('should update a user', async () => {
    const data = { email: 'updated@example.com' };
    const result = await service.updateUser('mockUserId', data);

    expect(firestoreMock.collection().doc).toHaveBeenCalledWith('mockUserId');
    expect(result).toEqual({ id: 'mockUserId', email: 'updated@example.com' });
  });

  it('should delete a user', async () => {
    const result = await service.deleteUser('mockUserId');

    expect(firestoreMock.collection().doc).toHaveBeenCalledWith('mockUserId');
    expect(result).toEqual({ message: 'User deleted successfully' });
  });
});
