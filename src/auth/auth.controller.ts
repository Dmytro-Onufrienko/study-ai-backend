import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const { email, password } = body;
    const { idToken, refreshToken } = await this.authService.signIn(email, password);

    response.cookie('accessToken', idToken, { httpOnly: true, secure: true });
    response.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

    return { message: 'Login successful' };
  }

  @Post('sign-out')
  async signOut(@Res({ passthrough: true }) response: Response) {
    await this.authService.signOut();

    response.clearCookie('accessToken');
    response.clearCookie('refreshToken');

    return { message: 'Logout successful' };
  }

  @Post('sign-up')
  async signUp(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.authService.signUp(email, password);
  }
}
