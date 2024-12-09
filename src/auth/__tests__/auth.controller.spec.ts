// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthController } from '../auth.controller';
// import { AuthService } from '../auth.service';
// import { HttpException, HttpStatus } from '@nestjs/common';
// import { Response } from 'express';

// describe('AuthController', () => {
//   let authController: AuthController;
//   let authService: AuthService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [AuthController],
//       providers: [
//         {
//           provide: AuthService,
//           useValue: {
//             login: jest.fn(),
//             register: jest.fn(),
//             logout: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     authController = module.get<AuthController>(AuthController);
//     authService = module.get<AuthService>(AuthService);
//   });

//   describe('login', () => {
//     it('should return success message and access token on successful login', async () => {
//       const loginDto = { emailId: 'test@example.com', password: 'password' };
//       const mockResponse = { cookie: jest.fn(), send: jest.fn() };

//       // Mock the service method
//       authService.login = jest.fn().mockResolvedValue({
//         status: 201,
//         message: 'Logged In successfully!',
//         access_token: 'mockAccessToken',
//       });

//       await authController.login({ body: loginDto }, mockResponse);

//       expect(authService.login).toHaveBeenCalledWith(loginDto, mockResponse);
//       expect(mockResponse.send).toHaveBeenCalledWith({
//         status: 201,
//         message: 'Logged In successfully!',
//         access_token: 'mockAccessToken',
//       });
//     });

//     it('should throw an exception if credentials are invalid', async () => {
//       const loginDto = { emailId: 'invalid@example.com', password: 'wrongpassword' };
//       const mockResponse = { cookie: jest.fn(), send: jest.fn() };

//       authService.login = jest.fn().mockRejectedValue(new HttpException('Invalid credentials', HttpStatus.NOT_FOUND));

//       await expect(authController.login({ body: loginDto }, mockResponse))
//         .rejects
//         .toThrowError(new HttpException('Invalid credentials', HttpStatus.NOT_FOUND));
//     });
//   });

//   describe('register', () => {
//     it('should register a new user and return success message', async () => {
//       const registerDto = { emailId: 'newuser@example.com', password: 'newpassword', role: 'user', userName: 'newuser' };
//       const result = { message: 'User registered successfully' };

//       authService.register = jest.fn().mockResolvedValue(result);

//       expect(await authController.register({ body: registerDto })).toEqual(result);
//       expect(authService.register).toHaveBeenCalledWith('newuser@example.com', 'newpassword', 'user', 'newuser');
//     });

//     it('should throw an exception if required data is missing', async () => {
//       const registerDto = { emailId: '', password: '', role: '', userName: '' };

//       await expect(authController.register({ body: registerDto }))
//         .rejects
//         .toThrowError(new HttpException('Data Missing', HttpStatus.NOT_FOUND));
//     });
//   });

//   describe('logout', () => {
//     it('should clear the cookie and return success message', async () => {
//       const mockRequest = {};
//       const mockResponse = { clearCookie: jest.fn(), send: jest.fn() };

//       authService.logout = jest.fn().mockResolvedValue({ message: 'Logged out successfully' });

//       await authController.logout({} as any, mockResponse);

//       expect(authService.logout).toHaveBeenCalledWith(mockRequest, mockResponse);
//       expect(mockResponse.clearCookie).toHaveBeenCalledWith('auth_token');
//       expect(mockResponse.send).toHaveBeenCalledWith({ message: 'Logged out successfully' });
//     });
//   });
// });
