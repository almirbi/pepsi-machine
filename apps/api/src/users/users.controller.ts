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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(LoggedInGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(LoggedInGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(LoggedInGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateUserDto) {
    return this.usersService.update(id, updateProductDto);
  }

  @UseGuards(LoggedInGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
