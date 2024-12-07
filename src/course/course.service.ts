import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto';
import { DatabaseService } from 'src/database/database.service';
import { Collection } from 'src/database/config/collections';
import { ICourse } from './entities/course.entity';
import { TopicService } from 'src/topic/topic.service';
import { DocumentData, DocumentReference, where } from 'firebase/firestore';
import { OpenAiService } from 'src/open-ai/open-ai.service';
import { ICourseResponse, ITopicResponse } from './interfaces/course-response.interface';
import { ITopic } from 'src/topic/entities/topic.entity';
import { getCreateCoursePropmt } from 'src/open-ai/prompts';

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
    const prompt = getCreateCoursePropmt(name);
    const { topics } = await this.openAiService.createComplention<ICourseResponse>(prompt);
    const course = await this.dbService.create(this.collectionName, { name, userId }) as DocumentReference<ICourse>;

    const topicRefs = await Promise.all(topics.map((topic: ITopicResponse) => {
      return this.topicService.create({...topic, course});
    }));

    return this.dbService.update<ICourse>(this.collectionName, course.id, { topics: topicRefs })
  }

  findAll(userId: string) {
    return this.dbService.getAllByUserId(this.collectionName, userId);
  }

  async findOne(id: string) {
    const course = await this.dbService.getById<ICourse>(this.collectionName, id);
    if (!course.topics || course.topics.length === 0) {
      return { ...course, topics: [] };
    }

    const topicIds = course.topics.map(
      (topicRef: DocumentReference<ITopic>) => topicRef.id
    );

    const topics = await this.dbService.getMany<ITopic>(Collection.TOPIC, [
      where('__name__', 'in', topicIds),
    ]);

    return {
      ...course,
      topics,
    };
  }
}
