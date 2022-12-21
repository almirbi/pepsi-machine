import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoggedInGuard } from './auth/logged-in.guard';
import { BuyProductDto } from './products/dto/buy-product.dto';
import { ProductsService } from './products/products.service';
import { ROLE } from './users/constants';
import { DepositDto } from './users/dto/deposit.dto';
import { Roles } from './users/roles.decorator';
import { RoleGuard } from './users/roles.guard';
import { UsersService } from './users/users.service';

type RequestWithUser = Request & { user: User };

@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  @Post('/deposit')
  @Roles(ROLE.BUYER)
  @UseGuards(RoleGuard, LoggedInGuard)
  deposit(@Body() body: DepositDto, @Req() request: RequestWithUser) {
    return this.usersService.deposit(body.deposit, request.user);
  }

  @Post('/buy')
  @Roles(ROLE.BUYER)
  @UseGuards(RoleGuard, LoggedInGuard)
  buy(@Body() body: BuyProductDto, @Req() request: RequestWithUser) {
    return this.productsService.buy(body.productId, body.amount, request.user);
  }

  @Post('/reset')
  @Roles(ROLE.BUYER)
  @UseGuards(RoleGuard, LoggedInGuard)
  reset(@Req() request: RequestWithUser) {
    return this.usersService.reset(request.user);
  }
}
