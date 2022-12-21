import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoggedInGuard } from './auth/logged-in.guard';
import { ROLE } from './users/constants';
import { DepositDto } from './users/dto/deposit.dto';
import { Roles } from './users/roles.decorator';
import { RoleGuard } from './users/roles.guard';
import { UsersService } from './users/users.service';

type RequestWithUser = Request & { user: User };

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/deposit')
  @Roles(ROLE.BUYER)
  @UseGuards(RoleGuard, LoggedInGuard)
  deposit(@Body() body: DepositDto, @Req() request: RequestWithUser) {
    return this.usersService.deposit(body.deposit, request.user);
  }
}
