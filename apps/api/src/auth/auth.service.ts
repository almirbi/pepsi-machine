import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
  ) {}

  async findByUsername(username: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async validateUser(username: string, inputPassword: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (user && user.password === inputPassword) {
      return user;
    }
    return null;
  }

  async register({ username, password, role }: CreateUserDto): Promise<User> {
    const newUser = await this.usersService.create({
      username,
      password,
      role,
    });

    return newUser;
  }
}
