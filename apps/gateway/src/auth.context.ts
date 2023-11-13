import { UnauthorizedException } from '@nestjs/common';

export const authContext = ({ req }) => {
  if (req.headers?.authorization) {
    // Validate JWT
    return {
      whoami: { id: '123' },
      type: 'USER'
    };
  }
  throw new UnauthorizedException();
}