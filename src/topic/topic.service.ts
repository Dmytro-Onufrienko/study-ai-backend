import { DocumentReference, where } from 'firebase/firestore';
import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Collection } from 'src/database/config/collections';
import { DatabaseService } from 'src/database/database.service';
import { ICourse } from 'src/course/entities/course.entity';
import { ITopic } from './entities/topic.entity';

@Injectable()
export class TopicService {
  private collectionName: Collection;

  constructor(private dbService: DatabaseService) {
    this.collectionName = Collection.TOPIC
  }
  create(createTopicDto: CreateTopicDto) {
    return 'This action adds a new topic';
  }

  findAll() {
    return `This action returns all topic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topic`;
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
