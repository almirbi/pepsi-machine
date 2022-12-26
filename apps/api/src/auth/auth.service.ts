import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async insertSession({ user, sessionId }) {
    return this.prisma.sessions.create({
      data: { userId: user.id, sessionId },
    });
  }

  async logout({ userId }) {
    return this.prisma.sessions.deleteMany({
      where: { userId },
    });
  }

  async validateUser(
    username: string,
    inputPassword: string,
    isLogout?: boolean,
  ): Promise<User> {
    debugger;
    // TODO: can be joined into one query
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!isLogout) {
      const session = await this.prisma.sessions.findFirst({
        where: { userId: user.id },
      });

      if (session) {
        throw new HttpException(
          `There is already an active session using your account`,
          HttpStatus.UNAUTHORIZED,
        );
      }
    }

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
