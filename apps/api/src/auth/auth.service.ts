import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async findByUsername(email: string): Promise<User> {
    const user = await this.usersService.findOne(email);
    return user;
  }

  async validateUser(email: string, inputPassword: string): Promise<User> {
    const user = await this.usersService.findOne(email);

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
