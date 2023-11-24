import {
  Resolver,
  ObjectType,
  ResolveField,
  Args,
  Mutation,
  Int,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@ObjectType('UserMutations')
class UserMutations { }

@Resolver(() => UserMutations)
export class UserMutationsResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => UserMutations, { name: 'userMutations' })
  async getRoot() {
    return new UserMutations();
  }

  @ResolveField(() => UserDto, { name: 'create' })
  async createUser(
    @Args('createUserInput', { type: () => CreateUserDto })
    createUserDto: CreateUserDto,
  ) {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @ResolveField(() => UserDto, { name: 'update' })
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput', { type: () => UpdateUserDto })
    updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.update(id, updateUserDto);
    return user;
  }
}
