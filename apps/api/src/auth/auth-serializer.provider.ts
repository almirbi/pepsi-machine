import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }
  serializeUser(user: User, done: (err: Error, user: User) => void) {
    done(null, user);
  }

  async deserializeUser(
    payload: { username: string },
    // TODO
    done: (err: Error, user: Omit<User, 'password'>) => void,
  ) {
    const user = await this.authService.findByUsername(payload.username);
    done(null, user);
  }
}
