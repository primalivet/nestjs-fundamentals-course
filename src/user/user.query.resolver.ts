import {
  Resolver,
  Query,
  ObjectType,
  ResolveField,
  Args,
} from '@nestjs/graphql';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ObjectType('UserQueries')
class UserQueries { }

@Resolver(() => UserQueries)
export class UserQueriesResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => UserQueries, { name: 'userQueries' })
  getRoot() {
    return new UserQueries();
  }

  @ResolveField(() => [UserDto], { name: 'users' })
  getUsers() {
    return this.userService.findAll();
  }

  @ResolveField(() => UserDto, { name: 'user' })
  getUser(@Args('id') id: number) {
    return this.userService.findOne(id);
  }
}
