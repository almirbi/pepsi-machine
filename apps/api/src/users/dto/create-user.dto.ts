import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";
import { ROLE } from "../constants";
import {
  PasswordValidation,
  PasswordValidationRequirement,
} from "class-validator-password-check";

const passwordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};

export class CreateUserDto {
  @IsString()
  @MinLength(5)
  public username: string;

  @IsString()
  @MinLength(5)
  @MaxLength(64)
  @Validate(PasswordValidation, [passwordRequirement])
  public password: string;

  @IsNotEmpty()
  @IsEnum(ROLE)
  public role: ROLE;
}
