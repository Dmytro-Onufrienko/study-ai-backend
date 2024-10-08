import { DocumentData, DocumentReference, where } from 'firebase/firestore';
import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Collection } from 'src/database/config/collections';
import { DatabaseService } from 'src/database/database.service';
import { ICourse } from 'src/course/entities/course.entity';
import { ITopic } from './entities/topic.entity';
import { SubtopicService } from 'src/subtopic/subtopic.service';
import { ISubtopic } from 'src/course/entities/subtopic.entity';

@Injectable()
export class TopicService {
  private collectionName: Collection;

  constructor(
    private dbService: DatabaseService,
    private subtopicService: SubtopicService,
  ) {
    this.collectionName = Collection.TOPIC
  }

  async create({ name, subtopics }: CreateTopicDto) {
    const subtopicRefs = await Promise.all(subtopics.map((subtopic: string) => {
      return this.subtopicService.create({name: subtopic})
    }))
    
    return await this.dbService.create(this.collectionName, {name, subtopics: subtopicRefs})
  }

  findAll() {
    return `This action returns all topic`;
  }

  async findOne(id: string) {
    const topic = await this.dbService.getById<ITopic>(this.collectionName, id);
    const subtopics = await Promise.all(topic.subtopics.map(({ id }: DocumentReference<ISubtopic, DocumentData>) => {
      return this.subtopicService.findOne(id);
    }));
    
    return {
      ...topic,
      subtopics
    };
  }

  findAllByCourse(courseRef: DocumentReference<ICourse>): Promise<ITopic[]> {
    return this.dbService.getMany<ITopic>(this.collectionName, [where('course', '==', courseRef)]);
  }

  update(id: number, updateTopicDto: UpdateTopicDto) {
    return `This action updates a #${id} topic`;
  }

  remove(id: number) {
    return `This action removes a #${id} topic`;
  }
}
