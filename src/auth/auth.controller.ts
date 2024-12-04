import { Controller, Post, Get, Request, UseGuards, Response, HttpException, HttpStatus,InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req, @Response() res) {
    return this.authService.login(req.body, res);
  }

  @Post('register')
  async register(@Request() req) {
    const { emailId, password, role, userName} = req.body;
    if(!emailId || !password || !role || !userName) {
      throw new HttpException('Data Missing', HttpStatus.NOT_FOUND);
    }
    return this.authService.register(emailId, password, role, userName);
    
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Request() req, @Response() res) {
    // res.clearCookie('auth_token');
    // return res.send({ message: 'Logged out successfully' });
    return res.send(this.authService.logout(req, res)) 
  }
}
