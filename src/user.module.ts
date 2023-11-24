import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma/prisma.service';
import { UserQueriesResolver } from './user/user.query.resolver';
import { UserMutationsResolver } from './user/user.mutation.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, UserService, UserQueriesResolver, UserMutationsResolver],
})
export class UserModule { }
