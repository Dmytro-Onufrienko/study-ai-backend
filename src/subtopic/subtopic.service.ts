import { Injectable } from '@nestjs/common';
import { CreateSubtopicDto } from './dto/create-subtopic.dto';
import { UpdateSubtopicDto } from './dto/update-subtopic.dto';
import { Collection } from 'src/database/config/collections';
import { DatabaseService } from 'src/database/database.service';
import { ISubtopic } from 'src/course/entities/subtopic.entity';
import { ITopic } from 'src/topic/entities/topic.entity';
import { DocumentData, DocumentReference, where } from 'firebase/firestore';

@Injectable()
export class SubtopicService {
  private collectionName: Collection;

  constructor(private dbService: DatabaseService) {
    this.collectionName = Collection.SUBTOPIC
  }

  create(
    createSubtopicDto: CreateSubtopicDto
  ): Promise<DocumentReference<ISubtopic, DocumentData>> {
    return this.dbService.create(this.collectionName, createSubtopicDto) as unknown as Promise<DocumentReference<ISubtopic, DocumentData>>;
  }

  findAll() {
    return `This action returns all subtopic`;
  }

  findAllByCourse(topicRef: DocumentReference<ITopic>): Promise<ISubtopic[]> {
    return this.dbService.getMany<ISubtopic>(this.collectionName, [where('topic', '==', topicRef)]);
  }

  async findOne(id: string) {
    return await this.dbService.getById(this.collectionName, id);
  }

  update(id: number, updateSubtopicDto: UpdateSubtopicDto) {
    return `This action updates a #${id} subtopic`;
  }

  remove(id: number) {
    return `This action removes a #${id} subtopic`;
  }
}
