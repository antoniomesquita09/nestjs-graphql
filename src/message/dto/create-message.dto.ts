import { Field, InputType } from '@nestjs/graphql';

@InputType()
class CreateMessageDto {
  @Field()
  readonly content: string;

  @Field()
  readonly userId: number;
}

export default CreateMessageDto;
