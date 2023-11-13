import { createParamDecorator } from '@nestjs/common';
import { GraphQLExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (_data: any, ctx: GraphQLExecutionContext) => {
    try {
      const headers = ctx.getArgs()[2].req.headers; // Get request headers passed from gateway
      if (headers.whoami) return JSON.parse(headers.whoami);
    } catch (err) {
      return null;
    }
  }
)
