import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import admin from 'src/firebase/config/firebase-admin';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const accessToken = authHeader.replace('Bearer ', '');

    try {
      await admin.auth().verifyIdToken(accessToken);
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }
}