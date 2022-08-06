import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtRTGuard } from './guard/jwtRT.guard';
import { rtValidationPipe } from './pipes/refresh-token.validation.pipe';

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

  @UsePipes(new rtValidationPipe())
  @Post('refresh')
  // @UseGuards(JwtRTGuard) // i think it should be there
  @HttpCode(HttpStatus.OK)
  refresh(
    @Body('refreshToken')
    refreshToken: string,
  ) {
    return this.authService.refresh(refreshToken);
  }
}
