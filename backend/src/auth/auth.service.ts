import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async register(dto: RegisterDto) {

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      },
      select: {
        email: true,
        password: false
      }
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    
    const hashedPassword = await bcrypt.hash(dto.password, 12);

    try {
      return await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashedPassword
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          password: false
        }
      });
    } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new ConflictException("Email already exists!")
      }

      throw error
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      },
    })

    if(!user) {
      throw new UnauthorizedException("Invalid email or password")
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.password,
    )

    if(!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password")
    }

    return {
      message: "Login successful"
    }
  }
}
