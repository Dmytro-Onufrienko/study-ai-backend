import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DatabaseService } from 'src/database/database.service';
import { Collection } from 'src/database/config/collections';

@Injectable()
export class CourseService {
  private collectionName: Collection;

  constructor(private dbService: DatabaseService) {
    this.collectionName = Collection.COURSE
  }

  create(courseData: CreateCourseDto, userId: string) {
    return this.dbService.create(this.collectionName, {...courseData, userId});
  }

  findAll(userId: string) {
    return this.dbService.getAllByUserId(this.collectionName, userId);
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
