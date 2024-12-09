import { Module } from '@nestjs/common';
import { DocumentManagementService } from './document-management.service';
import { DocumentManagementController } from './document-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './document-entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entity/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Document, User]),
  UsersModule],
  controllers: [DocumentManagementController],
  providers: [DocumentManagementService, UsersService],
})
export class DocumentManagementModule {}
