import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DatabaseService } from 'src/database/database.service';
import { Collection } from 'src/database/config/collections';
import { ICourse } from './entities/course.entity';
import { TopicService } from 'src/topic/topic.service';
import { DocumentReference } from 'firebase/firestore';

@Injectable()
export class CourseService {
  private collectionName: Collection;

  constructor(
    private dbService: DatabaseService,
    private topicService: TopicService,
  ) {
    this.collectionName = Collection.COURSE
  }

  create(courseData: CreateCourseDto, userId: string) {
    return this.dbService.create(this.collectionName, {...courseData, userId});
  }

  findAll(userId: string) {
    return this.dbService.getAllByUserId(this.collectionName, userId);
  }

  async findOne(id: string) {
    const course = await this.dbService.getById<ICourse>(this.collectionName, id);
    const courseRef: DocumentReference<ICourse> = this.dbService.getDocRef(this.collectionName, id);
    const topics = await this.topicService.findAllByCourse(courseRef);

    return {
      ...course,
      topics,
    };
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
