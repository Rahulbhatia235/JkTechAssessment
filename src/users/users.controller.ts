import { Controller, Post, Request, Response,UseGuards, HttpStatus, HttpException, Get, Put, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UsersController {
    constructor(private userservice: UsersService){}
    @UseGuards(JwtAuthGuard)
    @Get('getallusers')
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'List of all users'})
    async getAllUsers(@Request() req) {
        try {
            const users = await this.userservice.getAllUsers(req);
            return users

        } catch(exception) {
            throw new HttpException(`Error: ${exception.message}`, HttpStatus.BAD_REQUEST);
        }
        
    }
    //*********************************//
    @UseGuards(JwtAuthGuard)
    @Get('profile') 
    @ApiOperation({ summary: 'Get Details of the Loggedin User' })
    @ApiResponse({ status: 200, description: 'Details of Logged In users' })
    async profile(@Request() req ) {
        try {
            const userProfile = await this.userservice.getProfile(req);
            return userProfile
        } catch(exception) {
            throw new HttpException(`Error: ${exception.message}`, exception.status);
        }
    }

    //*******************************
    @UseGuards(JwtAuthGuard)
    @Put('updateProfile')
    @ApiOperation({ summary: 'Updates Logged In Users Name' })
    @ApiBody({description: 'UserName to be updated', type: CreateUserDto})
    @ApiResponse({ status: 200, description: 'Updates User Data' })
    async updateUser(@Request() req) {
        const updated = await this.userservice.updateUser(req);
        return updated
    }

    //**********************************
    @UseGuards(JwtAuthGuard)
    @Delete('deleteUser')
    @ApiOperation({ summary: 'Deletes the User' })
    @ApiBody({description: 'Admin can delete the UserId provided in the body'})
    @ApiResponse({ status: 200, description: 'Deletes User Data' })
    async deleteUser(@Request() req) {
        try {
            const deleted= await this.userservice.deleteUser(req.user, req.body.emailId)
            return deleted
        } catch(exception) {
            throw new HttpException(`Error: ${exception.message}`, exception.status);
        }
        
    }

}
