import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string; // previous password

  @IsString()
  @IsNotEmpty()
  newPassword: string; // new password

  @IsString()
  @IsOptional()
  rtHash: string;
}
