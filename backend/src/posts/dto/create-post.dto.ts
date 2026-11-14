import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Notes from the build' })
  @IsString() @MinLength(5) @MaxLength(140)
  title!: string;

  @ApiProperty({ example: 'A practical guide to the things I learned...' })
  @IsString() @MinLength(30)
  content!: string;

  @ApiPropertyOptional({ example: ['TypeScript', 'Career'], type: [String] })
  @IsOptional() @IsArray() @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  published?: boolean;
}
