import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { Roles } from './roles.decorator';
import { ROLE } from './constants';
import { RoleGuard } from './roles.guard';
import { Self } from './self.decorator';
import { SelfUserGuard } from './self-user.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(ROLE.ADMIN)
  @UseGuards(RoleGuard, LoggedInGuard, SelfUserGuard)
  @UseGuards(LoggedInGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(RoleGuard, LoggedInGuard, SelfUserGuard)
  @Get(':id')
  @Self('id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(LoggedInGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateUserDto) {
    return this.usersService.update(id, updateProductDto);
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(LoggedInGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
