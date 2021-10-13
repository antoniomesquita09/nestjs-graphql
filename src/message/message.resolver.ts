import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import RepoService from 'src/repo.service';

import Message from 'src/db/models/message.entity';
import User from 'src/db/models/user.entity';

import MessageInput from './dto/create-message.dto';

@Resolver(() => Message)
class MessageResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Message])
  public async getMessages(): Promise<Message[]> {
    return this.repoService.messageRepository.find();
  }
  @Query(() => Message, { nullable: true })
  public async getMessage(@Args('id') id: number): Promise<Message> {
    return this.repoService.messageRepository.findOne(id);
  }

  @Mutation(() => Message)
  public async createMessage(
    @Args('data') input: MessageInput,
  ): Promise<Message> {
    const message = this.repoService.messageRepository.create({
      content: input.content,
      userId: input.userId,
    });
    return this.repoService.messageRepository.save(message);
  }

  @ResolveField(() => User)
  public async user(@Parent() parent: Message): Promise<User> {
    return this.repoService.userRepository.findOne(parent.userId);
  }
}
export default MessageResolver;
