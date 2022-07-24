import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUserResponse } from './interfaces/user-response-interface';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<IUserResponse> {
    const newUser = {
      ...createUserDto,
      createdAt: +new Date(),
      updatedAt: +new Date(),
    };
    const { password, ...res } = await this.prisma.user.create({
      data: newUser,
    });
    return res;
  }

  async findAll(): Promise<IUserResponse[]> {
    const res = await this.prisma.user.findMany();
    return res;
  }

  async findOne(id: string): Promise<IUserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('Not found');
    }
    const { password, ...userRes } = user;
    return userRes;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
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
    const userRes = await this.prisma.user.update({
      where: { id },
      data: newUser,
    });
    delete userRes.password;
    return userRes;
  }

  async remove(id: string): Promise<IUserResponse> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Not found');
    }
    return this.prisma.user.delete({ where: { id } });
  }
}
