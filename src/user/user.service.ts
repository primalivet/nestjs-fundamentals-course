import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) { }

  async findAll({ limit, offset }: PaginationQueryDto) {
    const users = await this.prismaService.user.findMany({
      take: limit,
      skip: offset,
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });
    return user;
  }

  async create(data: CreateUserDto) {
    const user = await this.prismaService.user.create({ data });
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    // TODO(Gustaf): refactor when prisma supports a updateOrThrow
    // https://github.com/prisma/prisma/issues/10142
    const existingUser = await this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });
    const user = await this.prismaService.user.update({
      where: { id: existingUser.id },
      data,
    });
    return user;
  }

  async remove(id: number) {
    // TODO(Gustaf): refactor when prisma supports a deleteOrThrow
    // https://github.com/prisma/prisma/issues/10142
    const existingUser = await this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });
    const user = await this.prismaService.user.delete({
      where: { id: existingUser.id },
    });
    return user;
  }
}
