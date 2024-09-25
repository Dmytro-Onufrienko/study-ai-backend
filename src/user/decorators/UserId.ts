import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import admin from 'src/firebase/config/firebase-admin';

export const UserIdFromCookies = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    
    const { accessToken } = request.cookies;

    const { uid } = await admin.auth().verifyIdToken(accessToken);

    return uid;
  },
);
