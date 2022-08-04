import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshDto {
  @IsString({
    message: 'Refresh token is incorrect',
  })
  @IsNotEmpty({
    message: 'Refresh token is empty',
  })
  refreshToken: string;
}
