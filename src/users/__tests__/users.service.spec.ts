import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Role, User } from '../entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {
          provide: getRepositoryToken(User),  // Inject mock Repository<User>
          useValue: mockUserRepository,      // Use the mock implementation of the repository
        },],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  const mockUserRepository = {
    find: jest.fn().mockResolvedValue([
      { id: 1, userName: 'user1', emailId: 'user1@example.com', password: 'password', role: 'admin' },
      { id: 2, userName: 'user2', emailId: 'user2@example.com', password: 'password', role: 'user' },
    ]),  // Mock the find method
    save: jest.fn().mockResolvedValue({ id: 1, userName: 'user1', emailId: 'user1@example.com', password: 'password', role: 'admin' }),
    // Add other repository methods you might need to mock
  };

  describe('getAllUsers', () => {
    it('should throw error if the user is not an admin', async () => {
      const req = { user: { role: 'user' } };  // Simulating a non-admin user
      const res = {};

      try {
        await service.getAllUsers(req);
      } catch (e) {
        expect(e instanceof HttpException).toBe(true);
        expect(e.response).toBe('Invalid Access!!');
        expect(e.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });

    it('should return users if the user is an admin', async () => {
      const req = { user: { role: 'admin' } };
      const mockUsers = [{ id: 1, userName: 'user1', emailId:'test@user.com', password:'testPasswrd', role: Role.User }, { id: 2, userName: 'user2', emailId:'test@user.com', password:'testPasswrd', role: Role.User }];
      jest.spyOn(service, 'find').mockResolvedValue(mockUsers);

      const result = await service.getAllUsers(req);
      expect(result).toEqual(mockUsers);
    });
  });
});
