import { AppConfig } from "@libs/boat";
import {
  Exists,
  IsEqualToProp,
  IsUnique,
  IsValidEmail,
  IsValueFromConfig,
} from "@libs/boat/validator";
import {
  IsEmail,
  IsIn,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from "class-validator";

export class RequestOtpDto {
  @IsNotEmpty()
  @IsValueFromConfig({ key: "settings.verificationType" })
  verificationType: string;

  @ValidateIf(
    (obj) =>
      obj &&
      obj.verificationType == AppConfig.get("settings.verificationType.mobile")
  )
  @IsMobilePhone("en-IN", {}, { message: "Invalid phone number" })
  @IsNotEmpty()
  contactMobileNumber: string;

  @ValidateIf(
    (obj) =>
      obj &&
      obj.verificationType == AppConfig.get("settings.verificationType.email")
  )
  @IsValidEmail()
  @IsNotEmpty()
  email?: string;

  @IsIn(["register", "login"])
  purpose?: string;
}

export class RegisterDto {
  @IsNotEmpty()
  @IsMobilePhone("en-IN", {}, { message: "Invalid phone number" })
  @IsUnique({ table: "users", column: "contactMobileNumber" })
  contactMobileNumber: string;

  @IsNotEmpty()
  @IsValidEmail()
  @IsUnique({ table: "users", column: "email" })
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Length(8, 20)
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEqualToProp("password")
  @IsString()
  confirmPassword: string;
}
export class LoginDto {
  @IsNotEmpty()
  @Exists({ table: "users", column: "email" })
  @ValidateIf(
    (obj) => obj && obj.loginType == AppConfig.get("settings.loginType.email")
  )
  email: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf(
    (obj) => obj && obj.loginType == AppConfig.get("settings.loginType.email")
  )
  password: string;
}

export class AdminLoginDto {
  @IsNotEmpty()
  @Exists({ table: "users", column: "email" })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class VerifyOtpDto {
  @IsOptional()
  @IsNotEmpty()
  @IsValidEmail()
  email?: string;

  @IsOptional()
  @IsNotEmpty({ message: "OTP is required" })
  mobileOTP?: string;

  @IsOptional()
  @IsNotEmpty({ message: "OTP is required" })
  emailOTP?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsMobilePhone("en-IN", {}, { message: "Invalid phone number" })
  contactMobileNumber?: string;
}

export class GetNoteDto {
  @IsOptional()
  status: number;

  @IsOptional()
  @Exists({ table: "notes", column: "id" })
  id?: number;
}

export class AddNoteDto {
  @IsString()
  description?: string;
  @IsIn([1, 2, 3])
  status: number;
}

export class UpdateNoteDto {
  @IsString()
  description?: string;

  @Exists({ table: "notes", column: "id" })
  id?: number;
}
