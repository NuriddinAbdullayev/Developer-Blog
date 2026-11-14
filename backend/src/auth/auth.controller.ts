import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register') @ApiOperation({ summary: 'Create an account' }) @ApiCreatedResponse() @ApiBadRequestResponse() @ApiConflictResponse()
  register(@Body() dto: RegisterDto) { return this.authService.register(dto); }
  @Post('login') @ApiOperation({ summary: 'Sign in' }) @ApiOkResponse() @ApiBadRequestResponse() @ApiUnauthorizedResponse()
  login(@Body() dto: LoginDto) { return this.authService.login(dto); }
}
