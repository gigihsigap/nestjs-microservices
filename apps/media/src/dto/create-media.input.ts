import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMediaInput {
  @Field()
  userId: string;

  @Field()
  type: string;

  @Field()
  access: string;

  @Field()
  url: string;
}
