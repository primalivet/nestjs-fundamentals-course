import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostService } from './post.service';
import { PostQueriesResolver } from './post.query.resolver';
import { PostMutationsResolver } from './post.mutation.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, PostService, PostQueriesResolver, PostMutationsResolver],
})
export class PostModule {}
