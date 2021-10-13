import { Field, InputType } from '@nestjs/graphql';

@InputType()
class CreateUserDto {
  @Field()
  readonly email: string;
}

export default CreateUserDto;
