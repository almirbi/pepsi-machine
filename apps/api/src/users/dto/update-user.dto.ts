import { PartialType } from "@nestjs/swagger";
import { IsIn } from "class-validator";

import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // TODO extract as constant
  @IsIn([5, 10, 20, 50, 100])
  deposit: number;
}
