import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaResolver, UserResolver } from './media.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2
      }
    })
  ],
  providers: [MediaResolver, MediaService, UserResolver],
})
export class MediaModule {}
