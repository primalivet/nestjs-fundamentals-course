import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) { }

  async findAll() {
    const posts = await this.prismaService.post.findMany();
    return posts;
  }

  async findOne(id: number) {
    const post = await this.prismaService.post.findUnique({ where: { id } });
    return post;
  }

  async create(data: CreatePostDto) {
    const post = await this.prismaService.post.create({
      data: {
        title: data.title,
        author: {
          connect: { id: data.authorId },
        },
      },
    });
    return post;
  }

  async update(id: number, data: UpdatePostDto) {
    const post = await this.prismaService.post.update({ where: { id }, data });
    return post;
  }

  async remove(id: number) {
    const post = await this.prismaService.post.delete({ where: { id } });
    return post;
  }
}
