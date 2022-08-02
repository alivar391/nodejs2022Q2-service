import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,
    private jwt: JwtService,
  ) {}

  async signup(authDto: AuthDto) {
    const hashPassword = await argon.hash(authDto.password);
    const newUser = {
      ...authDto,
      password: hashPassword,
      createdAt: +new Date(),
      updatedAt: +new Date(),
    };
    return await this.usersService.create(newUser);
  }

  async login(authDto: AuthDto) {
    const user = await this.prisma.user.findFirst({
      where: { login: authDto.login },
    });
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    const pwMatches = await argon.verify(user.password, authDto.password);
    if (!pwMatches) {
      throw new NotFoundException('Password is not correct');
    }
    return this.signToken(user.id, user.login);
  }

  async signToken(
    userId: string,
    login: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      login: login,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
      secret: process.env.JWT_SECRET_KEY,
    });

    return { accessToken: token };
  }
}
