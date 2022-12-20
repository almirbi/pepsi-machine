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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  async login(@Request() req) {
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
