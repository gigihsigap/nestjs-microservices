import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Media } from './media.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => [Media])
  medias?: Media[];
}
