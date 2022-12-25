import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { LoggedInGuard } from './logged-in.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  async login(@Request() req) {
    await this.authService.insertSession({
      user: req.user,
      sessionId: req.sessionID,
    });
    return req.session;
  }

  @Post('logout')
  @UseGuards(LoggedInGuard)
  async logout(@Request() req) {
    await this.authService.logout({
      user: req.user,
    });
    req.session.destroy();
    return req.session;
  }

  @Post('logout/all')
  @UseGuards(LocalAuthGuard)
  async logoutAll(@Request() req) {
    await this.authService.logout({
      user: req.user,
    });
    req.session.destroy();
    return req.session;
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.findByUsername(createUserDto.username);
    if (!user) {
      return this.authService.register(createUserDto);
    } else {
      throw new UnauthorizedException();
    }
  }
}
