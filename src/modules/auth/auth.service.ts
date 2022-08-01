import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(authDto: AuthDto) {
    const hashPassword = await argon.hash(authDto.password);
    const newUser = {
      ...authDto,
      password: hashPassword,
      createdAt: +new Date(),
      updatedAt: +new Date(),
    };
    const { password, ...res } = await this.prisma.user.create({
      data: newUser,
    });
    return res;
  }

  signin() {
    return { msg: 'I have signed in' };
  }
}
