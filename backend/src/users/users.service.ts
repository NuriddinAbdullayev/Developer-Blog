import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() { return this.prisma.user.findMany({ select: { id: true, name: true, createdAt: true, _count: { select: { posts: true } } }, orderBy: { createdAt: 'desc' } }); }
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true, name: true, createdAt: true, posts: { where: { published: true }, select: { id: true, title: true, content: true, createdAt: true, tags: { select: { name: true } } }, orderBy: { createdAt: 'desc' } } } });
    if (!user) throw new NotFoundException('Author not found');
    return user;
  }
}
