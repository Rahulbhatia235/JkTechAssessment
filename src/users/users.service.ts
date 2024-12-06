import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IntegerType, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, Role } from './entity/user.entity';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async find(): Promise<User[]> {
    return this.userRepository.find({ select: ["id", "emailId", "role", "userName"] });
  }

  async findOne(emailId: string): Promise<User> {
    return this.userRepository.findOneBy({emailId});
  }

  //
  async getAllUsers(req): Promise<User[]> {
    try {
      if (!req.user || req.user.role != 'admin') {
        throw new HttpException('Invalid Access!!', HttpStatus.NOT_FOUND);
      } else {
        const user = await this.find();
        return Promise.resolve(user)
      }
    } catch (err) {
      return Promise.reject(err)
    }

  }


  //Singup Any User In our Database
  async create(emailId: string, password: string, role: Role, userName: string): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.userRepository.create({ emailId, password: hashedPassword, role, userName });
      return this.userRepository.save(newUser);
    } catch (err) {
      console.log(err)
    }


  }
  //If User wants to update its profile Currently allwoing only userName to update
  async updateUser(req) {
    try {
      let userData = req.user;
      let emailId = userData.emailId;
      const allowedParams = ['userName'];
      const receivedParams = Object.keys(req.body);

      const invalidKeys = receivedParams.filter((key) => !allowedParams.includes(key));
      if (invalidKeys.length != 0) {
        throw new HttpException('Provided Params Not allowed to Change!!', HttpStatus.NOT_FOUND);
      } else {
        if (req.body.userName) {
          userData.userName = req.body.userName;
          return Promise.resolve(await this.userRepository.update({ emailId }, userData))
        }
      }
    } catch (err) {
      return Promise.reject(err)
    }
  }

  //Gets UserProfile Of logged in User

  async getProfile(req) {
    try {

      const user = await this.findOne(req.user.emailId)
      if (!user) {
        throw new HttpException('User Not Found!!', HttpStatus.NOT_FOUND);
      } else {
        return {
          userName: user.userName,
          id: user.id,
          emailId: user.emailId,
          role: user.role
        }
      }

    } catch (exception) {
      return Promise.reject(exception)
    }

  }

  //Api to Delete user from the Db . Allowing only Admin to Delete the user
  async deleteUser(userData: User, userIdToDelelte: number) {
    try {
      if(!userData) {
        throw new HttpException('Login To Continue!!', HttpStatus.NOT_FOUND);
      }
      if (userData.role != 'admin') {
        throw new HttpException('Invalid Access!!', HttpStatus.NOT_FOUND);
      } else {
        const result = await this.userRepository.delete(userIdToDelelte);
        if (result.affected === 0) {
          throw new HttpException(`User with email ID ${userIdToDelelte} not found`, HttpStatus.NOT_FOUND);
        }
        return Promise.resolve("User Deleted")
      }
    } catch(exception) {
      return Promise.reject(exception)
    }
    
  }

}
