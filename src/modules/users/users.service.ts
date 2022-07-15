import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UsersDataBase } from './users-storage';
import { IUserResponse } from './interfaces/user-response-interface';

@Injectable()
export class UsersService {
  constructor(private readonly usersDataBase: UsersDataBase) {}

  create(createUserDto: CreateUserDto): IUserResponse {
    const { password, ...newUser } = {
      id: uuidv4(),
      ...createUserDto,
      version: 1,
      createdAt: +new Date(),
      updatedAt: +new Date(),
    };
    this.usersDataBase.create({ password, ...newUser });
    return newUser;
  }

  findAll() {
    return this.usersDataBase.findAll();
  }

  findOne(id: string) {
    const user = this.usersDataBase.findOne(id);
    if (!user) {
      throw new NotFoundException('Not found');
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.usersDataBase.findOne(id);
    if (!user) {
      throw new NotFoundException('Not found');
    }
    return this.usersDataBase.update(id, updateUserDto);
  }

  remove(id: string) {
    const user = this.usersDataBase.findOne(id);
    if (!user) {
      throw new NotFoundException('Not found');
    }
    return this.usersDataBase.delete(id);
  }
}
