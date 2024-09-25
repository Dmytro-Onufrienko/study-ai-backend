import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import admin from 'src/firebase/config/firebase-admin';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { accessToken } = request.cookies;


    if (!accessToken) {
      throw new UnauthorizedException('Missing token');
    }

    return true;
  }
}