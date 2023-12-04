import {
  Resolver,
  ObjectType,
  ResolveField,
  Args,
  Mutation,
  Int,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './models/user.model';
import { CreateUserModel } from './models/create-user.model';
import { UpdateUserModel } from './models/update-user.model';

@ObjectType('UserMutations')
class UserMutations { }

@Resolver(() => UserMutations)
export class UserMutationsResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => UserMutations, { name: 'userMutations' })
  async getRoot() {
    return new UserMutations();
  }

  @ResolveField(() => UserModel, { name: 'create' })
  async createUser(
    @Args('data', { type: () => CreateUserModel }) data: CreateUserModel,
  ) {
    const user = await this.userService.create(data);
    return user;
  }

  @ResolveField(() => UserModel, { name: 'update' })
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('data', { type: () => UpdateUserModel })
    data: UpdateUserModel,
  ) {
    const user = await this.userService.update(id, data);
    return user;
  }

  @ResolveField(() => UserModel, { name: 'remove' })
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    const user = await this.userService.remove(id);
    return user;
  }
}
