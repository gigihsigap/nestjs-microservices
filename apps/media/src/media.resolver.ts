import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { CreateMediaInput } from './dto/create-media.input';
import { MediaService } from './media.service';
import { CurrentUser } from './decorator/current-user.decorator';
import { Media } from './entities/media.entity';
import { User } from './entities/user.entity';
import 'dotenv/config';
import { UnauthorizedException } from '@nestjs/common';


@Resolver(() => Media)
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Query(() => String)
  helloMediaQuery() {
    return 'Media Service: Hello query!';
  }

  @Mutation(() => String)
  helloMediaMutation(@Args('input') input: string) {
    return `Media Service: Hello mutation! Input: ${input}`;
  }

  @Query(() => String, { nullable: true })
  checkEnv(@Args('input') input: string) {
    return JSON.stringify(process.env[input]);
  }

  @Mutation(() => Media)
  createMedia(@Args('createMediaInput') createMediaInput: CreateMediaInput) {
    return this.mediaService.create(createMediaInput);
  }

  @Query(() => Media, { nullable: true })
  mediaById(@Args('id') id: string) {
    const data = this.mediaService.findOneByMediaId(id);
    return data;
  }

  @Query(() => [Media])
  mediasByUserId(@Args('id') id: string) {
    return this.mediaService.findAllByUserId(id);
  }
  
  @Mutation(() => Boolean)
  removeByMediaId(
    @Args('id') id: string, // ID data received from mutation argument
    @CurrentUser() user: User // user data received from Authorization
  ) {
    const data = this.mediaService.findOneByMediaId(id);
    if (data && user.id !== data.userId) {
      throw new UnauthorizedException()
    }
    if (data) {
      return this.mediaService.removeByMediaId(id);
    }
    return false
  }

  // Resolve to User service
  @ResolveField(() => User)
  user(@Parent() media: Media) {
    return { id: media.userId }
  }
}

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly mediaService: MediaService) {}

  // Think of resolver User, but without going to another subgraph
  @ResolveField(() => [Media])
  medias(@Parent() user: User): Media[] {
    return this.mediaService.findAllByUserId(user.id)
  }
}
