import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsString() @MinLength(3) @MaxLength(50) name!: string;
  @IsEmail() email!: string;
  @IsString() @MinLength(8) password!: string;
}
