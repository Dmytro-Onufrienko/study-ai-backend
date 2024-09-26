import { ExecutionContext, UnauthorizedException, createParamDecorator } from '@nestjs/common';
import admin from 'src/firebase/config/firebase-admin';

export const UserIdFromHeaders = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    
    // Extract the token from the Authorization header
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const accessToken = authHeader.replace('Bearer ', '');

    const { uid } = await admin.auth().verifyIdToken(accessToken);

    return uid;
  },
);
