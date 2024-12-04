import { Controller, Post, Request, UseGuards, HttpStatus, HttpException, Get, Put, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
@Controller('user')
export class UsersController {
    constructor(private userservice: UsersService){}
    @UseGuards(JwtAuthGuard)
    @Get('getallusers')
    async getAllUsers(@Request() req) {

        if(!req.user || req.user.role !='admin') {
            throw new HttpException('Invalid Access!!', HttpStatus.NOT_FOUND);
        } else {
            const user = await this.userservice.find();
            return user
        }
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('profile') 
    async profile(@Request() req ) {
        if(!req.user.emailId) {
            throw new HttpException('Token Expired!!', HttpStatus.NOT_FOUND);
        }else {
            const user = await this.userservice.findOne(req.user.emailId)
            if(!user) {
                throw new HttpException('User Not Found!!', HttpStatus.NOT_FOUND);
            } else {
                return {
                    userName:user.userName,
                    id: user.id,
                    emailId: user.emailId,
                    role: user.role                    
                }
            }
        }

    }

    @UseGuards(JwtAuthGuard)
    @Put('updateProfile')
    async updateUser(@Request() req) {
        return this.userservice.updateUser(req);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('deleteUser')
    async deleteUser(@Request() req) {
        if(!req.user) {
            throw new HttpException('Login To Continue!!', HttpStatus.NOT_FOUND);
        }
        return this.userservice.deleteUser(req.user, req.body.emailId)
    }

}
