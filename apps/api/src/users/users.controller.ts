import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoggedInGuard } from "../auth/logged-in.guard";
import { Self } from "./self.decorator";
import { SelfUserGuard } from "./self-user.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(LoggedInGuard, SelfUserGuard)
  @Get(":id")
  @Self("id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(LoggedInGuard, SelfUserGuard)
  @Patch(":id")
  @Self("id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateUserDto) {
    return this.usersService.update(id, updateProductDto);
  }

  @UseGuards(LoggedInGuard, SelfUserGuard)
  @Self("id")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
