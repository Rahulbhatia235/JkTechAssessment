// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthService } from '../auth.service';
// import { UsersService } from '../../users/users.service';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';

// describe('AuthService', () => {
//   let authService: AuthService;
//   let usersService: UsersService;
//   let jwtService: JwtService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         AuthService,
//         {
//           provide: UsersService,
//           useValue: {
//             findOne: jest.fn(),
//             create: jest.fn(),
//           },
//         },
//         {
//           provide: JwtService,
//           useValue: {
//             sign: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     authService = module.get<AuthService>(AuthService);
//     usersService = module.get<UsersService>(UsersService);
//     jwtService = module.get<JwtService>(JwtService);
//   });

//   describe('login', () => {
//     it('should return access token when credentials are valid', async () => {
//       const userDto = { emailId: 'test@example.com', password: 'password' };
//       const user = { emailId: 'test@example.com', password: 'hashedpassword', role: 'user', userName: 'Test User', id:4 };
//       const accessToken = 'mockAccessToken';

//       // Mocking external calls
//       jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
//       jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
//       jest.spyOn(jwtService, 'sign').mockReturnValue(accessToken);

//       const response = await authService.login(userDto, {} as any);

//       expect(response).toEqual({
//         status: 201,
//         message: 'Logged In successfully!',
//         access_token: accessToken,
//       });
//     });

//     it('should throw error if user is not found', async () => {
//       const userDto = { emailId: 'invalid@example.com', password: 'wrongpassword' };

//       jest.spyOn(usersService, 'findOne').mockResolvedValue(null);

//       await expect(authService.login(userDto, {} as any))
//         .rejects
//         .toThrowError(new Error('Invalid credentials'));
//     });

//     it('should throw error if password is incorrect', async () => {
//       const userDto = { emailId: 'test@example.com', password: 'wrongpassword' };
//       const user = { emailId: 'test@example.com', password: 'hashedpassword', role: 'user' };

//       jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
//       jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

//       await expect(authService.login(userDto, {} as any))
//         .rejects
//         .toThrowError(new Error('Invalid credentials'));
//     });
//   });
// });
