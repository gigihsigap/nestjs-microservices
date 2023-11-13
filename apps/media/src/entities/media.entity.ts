import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class Media {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field()
  type?: string;

  @Field()
  access?: string;

  @Field()
  url?: string;

  @Field(() => User)
  user?: User
}
