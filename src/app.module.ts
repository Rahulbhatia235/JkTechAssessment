import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';
import { Document } from './document-management/document-entity';
import { AuthModule } from './auth/auth.module';
import { DocumentManagementModule } from './document-management/document-management.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'nest_auth',
      entities: [User, Document],
      synchronize: true
    }),
    AuthModule,
    DocumentManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
