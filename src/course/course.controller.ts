import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
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
    return this.courseService.findOne(+id);
  }

  @UseGuards(FirebaseAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @UseGuards(FirebaseAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
