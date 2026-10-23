import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator"

export class RegisterDto {
  @ApiProperty({
    example: "Asadbek",
    description: "The user's name or full name."
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string

  @ApiProperty({
    example: "asadbek@gmail.com",
    description: "The user's email address."
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    example: "Strong_Password892!",
    description: "The user's password. Must be at least 8 characters.",
    minLength: 8
  })
  @IsString()
  @IsStrongPassword()
  password: string
}