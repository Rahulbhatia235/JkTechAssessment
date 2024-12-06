import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Role, User } from '../entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService,
                {
                    provide: getRepositoryToken(User),  
                    useValue: mockUserRepository,
                }
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
    });

    const mockUserRepository = {
        find: jest.fn().mockResolvedValue([
            { id: 1, userName: 'user1', emailId: 'user1@example.com', password: 'password', role: 'admin' },
            { id: 2, userName: 'user2', emailId: 'user2@example.com', password: 'password', role: 'user' },
        ]),
        save: jest.fn().mockResolvedValue({ id: 1, userName: 'user1', emailId: 'user1@example.com', password: 'password', role: 'admin' }),
        findOneBy: jest.fn().mockResolvedValue(
            { id: 1, userName: 'user1', emailId: 'user1@example.com', password: 'password', role: 'admin' }
        ),
        delete: jest.fn().mockResolvedValue({
            affected: 1,
        }),
    };

    describe('getAllUsers', () => {
        it('should return users if the user is an admin', async () => {
            const req = { user: { role: 'admin' } };
            const mockUsers = [{ id: 1, userName: 'user1', emailId: "test@email.com", role: Role.User, password: "234yughj" }, { id: 2, userName: 'user2', role: Role.Admin, emailId: "tess2t@gmail.com", password: "2143243543" }];
            jest.spyOn(service, 'getAllUsers').mockResolvedValue(mockUsers);

            const result = await controller.getAllUsers(req);
            expect(result).toEqual(mockUsers);
        });

        it('should throw error if the user is not an admin', async () => {
            const req = { user: { role: 'user' } };
            jest.spyOn(service, 'getAllUsers').mockRejectedValue(new HttpException('Invalid Access!!', HttpStatus.BAD_REQUEST));

            try {
                await controller.getAllUsers(req);
            } catch (e) {
                expect(e instanceof HttpException).toBe(true);
                expect(e.response).toBe('Error: Invalid Access!!');
                expect(e.getStatus()).toBe(HttpStatus.BAD_REQUEST);
            }
        });
    });

    describe('profile', () => {

        it('should throw error if the emailId is not present in database', async () => {
            const req = { user: { emailId: 'test@test.com' } };
            jest.spyOn(service, 'getProfile').mockRejectedValue(new HttpException('User Not Found!!', HttpStatus.NOT_FOUND));

            try {
                await controller.profile(req);
            } catch (e) {
                expect(e instanceof HttpException).toBe(true);
                expect(e.response).toBe('Error: User Not Found!!');
                expect(e.getStatus()).toBe(HttpStatus.NOT_FOUND);
            }
        });

        it('should return profile Data of the logged in user ', async () => {
            const req = { user: { emailId: 'testUser@user.com' } };
            const mockUsers = { id: 1, userName: 'user1', emailId: "test@email.com", role: Role.User, password: "234yughj" }
            jest.spyOn(service, 'getProfile').mockResolvedValue(mockUsers);

            const result = await controller.profile(req);
            expect(result).toEqual(mockUsers);
        });

        it('should throw an error if user not found', async () => {

            const mockUserService = {
                getProfile: jest.fn(),
            };

            const mockReq = {
                user: { emailId: 'test@notfound.com' },
            };
            mockUserService.getProfile.mockRejectedValue(new HttpException('User Not Found!!', HttpStatus.NOT_FOUND));


            try {
                await controller.profile(mockReq);
            } catch (exception) {
                expect(exception.response).toBe('Error: User Not Found!!');
                expect(exception.status).toBe(HttpStatus.NOT_FOUND);
            }
        });

    });

    describe('delete', () => {
        
        it('should throw an error if user is not found', async () => {
            const mockUserService = {
                deleteUser: jest.fn(),
            };
            const mockRequest = {
                user: { id: 1, emailId: 'admin@example.com', role:'admin'},
                body: { emailId: 'nonexistent@example.com' },
            };
            mockUserService.deleteUser.mockRejectedValue(
                new HttpException('User not found', HttpStatus.NOT_FOUND),
            );

            
            try {
                await controller.deleteUser(mockRequest);
            } catch (exception) {
                expect(exception.response).toBe('Error: User not found');
                expect(exception.status).toBe(HttpStatus.NOT_FOUND);
            }
        });
    })
});
