import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({
    summary: "Register a new user",
    description: "Creates a new user account using the provided details."
  })
  @ApiBody({
    type: RegisterDto
  })
  @ApiCreatedResponse({
    description: "User created successfully."
  })
  @ApiBadRequestResponse({
    description: "Invalid registration data."
  })
  @ApiConflictResponse({
    description: 'Email is already registered.',
  })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto)
  }


  @Post("login")
  @ApiOperation({
    summary: "Sign in to an account.",
    description: "Authenticates a user using their email and password."
  })
  @ApiBody({
    type: LoginDto
  })
  @ApiOkResponse({
    description: "User signed in successfully."
  })
  @ApiBadRequestResponse({
    description: "Invalid login data."
  })
  @ApiUnauthorizedResponse({
    description: "Invalid email or password."
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }
}
