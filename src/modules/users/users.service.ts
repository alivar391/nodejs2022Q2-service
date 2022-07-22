import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UsersDataBase } from './users-storage';
import { IUserResponse } from './interfaces/user-response-interface';
import { PrismaService } from '../../prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersDataBase: UsersDataBase,
    private prisma: PrismaService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUserResponse> {
    const { password, ...newUser } = {
      id: uuidv4(),
      ...createUserDto,
      version: 1,
      createdAt: +new Date(),
      updatedAt: +new Date(),
    };
    await this.prisma.user.create({ data: { password, ...newUser } });
    this.usersDataBase.create({ password, ...newUser });
    return newUser;
  }

  findAll() {
    // const allUsers = this.usersDataBase.findAll().map((user) => {
    //   const { password, ...userRes } = user;
    //   return userRes;
    // });
    // return allUsers;
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    const user = this.usersDataBase.findOne(id);
    if (!user) {
      throw new NotFoundException('Not found');
    }
    const { password, ...userRes } = user;
    return userRes;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.usersDataBase.findOne(id);
    if (!user) {
      throw new NotFoundException('Not found');
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Wrong password');
    }
    const newUser: User = {
      ...user,
      password: updateUserDto.newPassword,
      version: user.version + 1,
      updatedAt: +new Date(),
    };
    const { password, ...userRes } = this.usersDataBase.update(id, newUser);
    return userRes;
  }

  remove(id: string) {
    const user = this.usersDataBase.findOne(id);
    if (!user) {
      throw new NotFoundException('Not found');
    }
    return this.usersDataBase.delete(id);
  }
}
