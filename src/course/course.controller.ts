import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto';
import { UserIdFromHeaders } from 'src/user/decorators/UserIdFromHeaders';
import { FirebaseAuthGuard } from 'src/auth/gurads/firebase-auth.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(FirebaseAuthGuard)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @UserIdFromHeaders() userId: string) {
    return this.courseService.create(createCourseDto, userId);
  }

  @UseGuards(FirebaseAuthGuard)
  @Get()
  findAll(@UserIdFromHeaders() userId: string) {
    return this.courseService.findAll(userId);
  }

  @UseGuards(FirebaseAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }
}
