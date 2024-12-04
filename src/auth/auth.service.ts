import { Injectable, UnauthorizedException, HttpException, HttpStatus, Res, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Role } from '../users/entity/user.entity'
import { Response, Request} from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any, @Res() res: Response) {
    const userData = await this.usersService.findOne(user.emailId);
    if (!user) {
        // throw new Error('Invalid credentials');
        throw new HttpException('Invalid credentials', HttpStatus.NOT_FOUND);
    
    }
    const isPasswordValid = await bcrypt.compare(user.password, userData.password);
    if (!isPasswordValid) {
        throw new HttpException('Invalid credentials', HttpStatus.NOT_FOUND);
    }
    const payload = { emailId: userData.emailId, role: userData.role};
    let access_token= this.jwtService.sign(payload);
    
    res.cookie('auth_token', access_token, {
        maxAge: 60 * 60 * 1000, // 1 hour expiration
    });
      return res.send({status:201,
        message: "Logged In successFully!!",
        access_token: access_token
    })
  }

  async register(emailId: string, password: string, role: Role, userName: string) {

    
    return this.usersService.create(emailId, password, role, userName);
    
  }

  logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('auth_token');
    return { message: 'Logged out successfully' }
  }
}
