import { Role } from '@prisma/client';

export class CreateUserDto {
  public username: string;
  public password: string;
  public roles: Role[];
}
