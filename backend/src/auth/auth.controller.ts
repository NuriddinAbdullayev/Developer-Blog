import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

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
}
