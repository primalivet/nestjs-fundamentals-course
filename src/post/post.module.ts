import { Logger, Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostService } from './post.service';
import { PostModelResolver, PostQueriesResolver } from './post.query.resolver';
import { PostMutationsResolver } from './post.mutation.resolver';
import { UserService } from '../user/user.service';
import { GQLConnectionService } from '../common/gql-connection.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    Logger,
    PrismaService,
    UserService,
    PostService,
    GQLConnectionService,
    PostModelResolver,
    PostQueriesResolver,
    PostMutationsResolver,
  ],
})
export class PostModule { }
