import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DatabaseService } from 'src/database/database.service';
import { Collection } from 'src/database/config/collections';
import { ICourse } from './entities/course.entity';
import { TopicService } from 'src/topic/topic.service';
import { DocumentData, DocumentReference } from 'firebase/firestore';
import { OpenAiService } from 'src/open-ai/open-ai.service';
import { ITopicResponse } from './interfaces/course-response.interface';
import { ITopic } from 'src/topic/entities/topic.entity';

@Injectable()
export class CourseService {
  private collectionName: Collection;

  constructor(
    private dbService: DatabaseService,
    private topicService: TopicService,
    private openAiService: OpenAiService,
  ) {
    this.collectionName = Collection.COURSE
  }

  async create({ name }: CreateCourseDto, userId: string) {
    const { topics } = await this.openAiService.createCourse(name);

    const topicRefs = await Promise.all(topics.map((topic: ITopicResponse) => {
      return this.topicService.create(topic);
    }));

    return this.dbService.create(this.collectionName, {name, userId, topics: topicRefs});
  }

  findAll(userId: string) {
    return this.dbService.getAllByUserId(this.collectionName, userId);
  }

  async findOne(id: string) {
    const course = await this.dbService.getById<ICourse>(this.collectionName, id);
    const topics = await Promise.all(course.topics.map(({ id }: DocumentReference<ITopic, DocumentData>) => {
      return this.topicService.findOne(id)
    }));

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
