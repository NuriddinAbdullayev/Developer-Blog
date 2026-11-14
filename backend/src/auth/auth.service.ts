import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}
  private async issueToken(user: { id: string; name: string; email: string }) {
    return { user, access_token: await this.jwtService.signAsync({ sub: user.id, email: user.email }) };
  }
  async register(dto: RegisterDto) {
    try {
      const user = await this.prisma.user.create({ data: { name: dto.name.trim(), email: dto.email.toLowerCase(), password: await bcrypt.hash(dto.password, 12) }, select: { id: true, name: true, email: true } });
      return this.issueToken(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') throw new ConflictException('Email already exists');
      throw error;
    }
  }
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) throw new UnauthorizedException('Invalid email or password');
    return this.issueToken({ id: user.id, name: user.name, email: user.email });
  }
}
