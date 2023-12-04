import { Logger, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserQueriesResolver, UserModelResolver } from './user.query.resolver';
import { UserMutationsResolver } from './user.mutation.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { PostService } from '../post/post.service';
import { GQLConnectionService } from '../common/gql-connection.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    Logger,
    PrismaService,
    PostService,
    UserService,
    GQLConnectionService,
    UserModelResolver,
    UserQueriesResolver,
    UserMutationsResolver,
  ],
})
export class UserModule { }
