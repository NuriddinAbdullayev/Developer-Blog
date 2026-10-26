import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
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
    description: "The user's password.",
  })
  @IsString()
  @IsNotEmpty()
  password: string
}