import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
  ) { }

  async findAll(paginationQuery: PaginationQueryDto) {
    const posts = await this.prismaService.post.findMany({
      skip: paginationQuery.offset,
      take: paginationQuery.limit,
    });
    return posts;
  }

  async findAllByUserId(paginationQuery: PaginationQueryDto, userId: number) {
    this.logger.log(`find all posts by user id ${userId}`);
    const posts = await this.prismaService.post.findMany({
      where: { authorId: userId },
      skip: paginationQuery.offset,
      take: paginationQuery.limit,
    });
    return posts;
  }

  async findOne(id: number) {
    const post = await this.prismaService.post.findUniqueOrThrow({
      where: { id },
    });
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
    // TODO(Gustaf): refactor when prisma supports a deleteOrThrow
    // https://github.com/prisma/prisma/issues/10142
    const existingPost = await this.prismaService.post.findUniqueOrThrow({
      where: { id },
    });
    const post = await this.prismaService.post.update({
      where: { id: existingPost.id },
      data,
    });
    return post;
  }

  async remove(id: number) {
    // TODO(Gustaf): refactor when prisma supports a deleteOrThrow
    // https://github.com/prisma/prisma/issues/10142
    const existingPost = await this.prismaService.post.findUniqueOrThrow({
      where: { id },
    });
    const post = await this.prismaService.post.delete({
      where: { id: existingPost.id },
    });
    return post;
  }
}
