import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';

const postInclude = { author: { select: { id: true, name: true } }, tags: { select: { name: true } }, _count: { select: { likes: true, comments: true } } } satisfies Prisma.PostInclude;
@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreatePostDto, authorId: string) {
    return this.prisma.post.create({ data: { title: dto.title, content: dto.content, published: dto.published ?? true, authorId, tags: { connectOrCreate: (dto.tags ?? []).map(name => ({ where: { name: name.trim().toLowerCase() }, create: { name: name.trim().toLowerCase() } })) } }, include: postInclude });
  }
  findAll(q?: string, tag?: string, page = 1, limit = 12) {
    const where: Prisma.PostWhereInput = { published: true, ...(q ? { OR: [{ title: { contains: q, mode: 'insensitive' } }, { content: { contains: q, mode: 'insensitive' } }, { author: { name: { contains: q, mode: 'insensitive' } } }] } : {}), ...(tag ? { tags: { some: { name: tag.toLowerCase() } } } : {}) };
    return this.prisma.post.findMany({ where, include: postInclude, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit });
  }
  async findOne(id: string) {
    const post = await this.prisma.post.findFirst({ where: { id, published: true }, include: { ...postInclude, comments: { include: { user: { select: { id: true, name: true } } }, orderBy: { createdAt: 'asc' } } } });
    if (!post) throw new NotFoundException('Story not found');
    return post;
  }
  async update(id: string, dto: UpdatePostDto, userId: string) {
    const post = await this.prisma.post.findUnique({ where: { id }, select: { authorId: true } });
    if (!post) throw new NotFoundException('Story not found');
    if (post.authorId !== userId) throw new ForbiddenException('You can only edit your own stories');
    return this.prisma.post.update({ where: { id }, data: { title: dto.title, content: dto.content, published: dto.published, ...(dto.tags ? { tags: { set: [], connectOrCreate: dto.tags.map(name => ({ where: { name: name.trim().toLowerCase() }, create: { name: name.trim().toLowerCase() } })) } } : {}) }, include: postInclude });
  }
  async remove(id: string, userId: string) {
    const post = await this.prisma.post.findUnique({ where: { id }, select: { authorId: true } });
    if (!post) throw new NotFoundException('Story not found');
    if (post.authorId !== userId) throw new ForbiddenException('You can only delete your own stories');
    await this.prisma.post.delete({ where: { id } });
    return { deleted: true };
  }
  async toggleLike(id: string, userId: string) {
    const existing = await this.prisma.like.findUnique({ where: { userId_postId: { userId, postId: id } } });
    if (existing) await this.prisma.like.delete({ where: { id: existing.id } });
    else await this.prisma.like.create({ data: { userId, postId: id } });
    return { liked: !existing };
  }
  async addComment(id: string, userId: string, content: string) {
    const post = await this.prisma.post.findFirst({ where: { id, published: true }, select: { id: true } });
    if (!post) throw new NotFoundException('Story not found');
    return this.prisma.comment.create({ data: { postId: id, userId, content }, include: { user: { select: { id: true, name: true } } } });
  }
}
