import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ROLE } from '../constants';

export class CreateUserDto {
  @IsString()
  @MinLength(5)
  public username: string;

  @IsString()
  @MinLength(5)
  public password: string;

  @IsNotEmpty()
  @IsEnum(ROLE)
  public role: ROLE;
}
