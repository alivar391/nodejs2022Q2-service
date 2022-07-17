import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersDataBase } from './users-storage';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersDataBase],
})
export class UsersModule {}
