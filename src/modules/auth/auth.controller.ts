import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshDto } from './dto/refresh-token.dto';
import { JwtRTGuard } from './guard/jwtRT.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @Post('refresh')
  @UseGuards(JwtRTGuard)
  @HttpCode(HttpStatus.OK)
  refresh(
    @Body(
      new ValidationPipe({
        exceptionFactory: (errors) => {
          return new UnauthorizedException(errors);
        },
      }),
    )
    refreshDto: RefreshDto,
  ) {
    return this.authService.refresh(refreshDto);
  }
}
