import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { authContext } from './auth.context';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        context: authContext,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'user',
              url: 'http://localhost:3001/graphql'
            },
            {
              name: 'media',
              url: 'http://localhost:3002/graphql'
            }
          ]
        }),
        buildService({ url }) {
          // Pass down context to subgraph as header 
          console.log("Build service", url)
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              request.http.headers.set(
                'whoami',
                context.whoami ? JSON.stringify(context.whoami) : null
              )
            }
          })
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
