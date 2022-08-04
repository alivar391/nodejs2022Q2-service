import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshDto } from './dto/refresh-token.dto';
import jwt_decode from 'jwt-decode';

interface Decode {
  sub: string;
  login: string;
}
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
      throw new ForbiddenException('No user with this login');
    }
    const pwMatches = await argon.verify(user.password, authDto.password);
    if (!pwMatches) {
      throw new ForbiddenException('Password is not correct');
    }
    const { accessToken, refreshToken } = await this.signToken(
      user.id,
      user.login,
    );
    const rtHash = await argon.hash(refreshToken);
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        rtHash,
      },
    });
    return { accessToken, refreshToken };
  }

  async refresh(refreshDto: RefreshDto) {
    if (!refreshDto) {
      throw new UnauthorizedException('No refresh token in the boby');
    }
    const decode: Decode = jwt_decode(refreshDto.refreshToken);
    const user = await this.prisma.user.findUnique({
      where: { id: decode.sub },
    });
    if (!user) {
      throw new ForbiddenException('No user with this login');
    }
    const pwMatches = await argon.verify(user.rtHash, refreshDto.refreshToken);
    if (!pwMatches) {
      throw new ForbiddenException('Refresh token is not correct');
    }

    const { accessToken, refreshToken } = await this.signToken(
      user.id,
      user.login,
    );
    const rtHash = await argon.hash(refreshToken);
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        rtHash,
      },
    });
    return { accessToken, refreshToken };
  }

  async signToken(
    userId: string,
    login: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const payload = {
      sub: userId,
      login: login,
    };

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
      secret: process.env.JWT_SECRET_KEY,
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });

    return { accessToken, refreshToken };
  }
}
