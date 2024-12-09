import { Controller, Post, Get, Request, UseGuards, Response, HttpException, HttpStatus,InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  //Login API
  @Post('login')
  @ApiOperation({ summary: 'Login to the application' })
  @ApiBody({
    description: 'The user login credentials',
    type: LoginDto,
  })
  @ApiResponse({ status: 200, description: 'Login successful', schema: { type: 'object', properties: { auth_token: { type: 'string', example: 'jwt-token' }, message: { example:"Logged In successFully!!"} } } })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  async login(@Request() req, @Response() res) {
    try {
      return await this.authService.login(req.body, res);
    } catch(exception) {
      throw new HttpException(`Error: ${exception.message}`, exception.status);
    }
    
  }
  //*********************//
  //SignUp API

  @Post('register')
  @ApiOperation({ summary: 'Signup in the application' })
  @ApiBody({
    description: 'The user registration data',
    type: RegisterDto,
  })
  @ApiResponse({ status: 200, description: 'Singup successful', schema: { type: 'object', properties: { message: { type: 'string', example: 'Detials of the User' } } } })
  @ApiResponse({ status: 400, description: 'User Already Exists' })
  async register(@Request() req) {
    const { emailId, password, role, userName} = req.body;
    if(!emailId || !password || !role || !userName) {
      throw new HttpException('Data Missing', HttpStatus.NOT_FOUND);
    }
    return this.authService.register(emailId, password, role, userName);
    
  }
  //******************//
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  @ApiOperation({ summary: 'Logout from the application' })
  @ApiResponse({ status: 200, description: 'Logged out successfully'})
  logout(@Request() req, @Response() res) {
    // res.clearCookie('auth_token');
    // return res.send({ message: 'Logged out successfully' });
    return res.send(this.authService.logout(req, res)) 
  }
}
