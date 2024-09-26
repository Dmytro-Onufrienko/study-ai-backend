import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { FirebaseAuthGuard } from 'src/auth/gurads/firebase-auth.guard';
import { UserIdFromHeaders } from './decorators/UserIdFromHeaders';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get()
  async getCurrentUser(@UserIdFromHeaders() userId: string) {
    return await this.userService.getCurrentUser(userId);
  }
}
