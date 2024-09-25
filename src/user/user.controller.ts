import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { FirebaseAuthGuard } from 'src/auth/gurads/firebase-auth.guard';
import { UserIdFromCookies } from './decorators/UserId';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get()
  async getCurrentUser(@UserIdFromCookies() userId: string) {
    return await this.userService.getCurrentUser(userId);
  }
}
