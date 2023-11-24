import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) { }

  async findAll() {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    return user;
  }

  async create(data: CreateUserDto) {
    const user = await this.prismaService.user.create({ data });
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.prismaService.user.update({ where: { id }, data });
    return user;
  }

  async remove(id: number) {
    const user = await this.prismaService.user.delete({ where: { id } });
    return user;
  }
}
