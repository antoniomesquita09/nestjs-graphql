import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import User from 'src/db/models/user.entity';
import RepoService from 'src/repo.service';
import CreateUserDto from './dto/create-user.dto';

@Resolver(() => User)
class UserResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [User])
  public async getUsers(): Promise<User[]> {
    return this.repoService.userRepository.find();
  }
  @Query(() => User, { nullable: true })
  public async getUser(@Args('id') id: number): Promise<User> {
    return this.repoService.userRepository.findOne(id);
  }

  @Mutation(() => User)
  public async createUser(@Args('data') input: CreateUserDto): Promise<User> {
    const user = this.repoService.userRepository.create({ email: input.email });
    return this.repoService.userRepository.save(user);
  }
}

export default UserResolver;
