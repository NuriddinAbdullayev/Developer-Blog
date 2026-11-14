import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, DefaultValuePipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../auth/user.decorator.js';
import { PostsService } from './posts.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

@ApiTags('Stories')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Post() @UseGuards(AuthGuard('jwt')) @ApiBearerAuth()
  create(@Body() dto: CreatePostDto, @User('userId') userId: string) { return this.postsService.create(dto, userId); }
  @Get()
  findAll(@Query('q') q?: string, @Query('tag') tag?: string, @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number, @Query('limit', new DefaultValuePipe(12), ParseIntPipe) limit?: number) { return this.postsService.findAll(q, tag, Math.max(1, page ?? 1), Math.min(50, Math.max(1, limit ?? 12))); }
  @Get(':id') findOne(@Param('id') id: string) { return this.postsService.findOne(id); }
  @Patch(':id') @UseGuards(AuthGuard('jwt')) @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdatePostDto, @User('userId') userId: string) { return this.postsService.update(id, dto, userId); }
  @Delete(':id') @UseGuards(AuthGuard('jwt')) @ApiBearerAuth()
  remove(@Param('id') id: string, @User('userId') userId: string) { return this.postsService.remove(id, userId); }
  @Post(':id/like') @UseGuards(AuthGuard('jwt')) @ApiBearerAuth()
  like(@Param('id') id: string, @User('userId') userId: string) { return this.postsService.toggleLike(id, userId); }
  @Post(':id/comments') @UseGuards(AuthGuard('jwt')) @ApiBearerAuth()
  comment(@Param('id') id: string, @User('userId') userId: string, @Body() dto: CreateCommentDto) { return this.postsService.addComment(id, userId, dto.content); }
}
