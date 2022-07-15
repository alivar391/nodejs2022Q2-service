import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string; // previous password

  @IsString()
  @IsNotEmpty()
  newPassword: string; // new password
}
