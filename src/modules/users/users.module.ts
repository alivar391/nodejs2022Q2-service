import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersDataBase } from './users-storage';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersDataBase, PrismaService],
})
export class UsersModule {}
