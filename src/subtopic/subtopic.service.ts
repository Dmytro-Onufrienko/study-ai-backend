import { Injectable } from '@nestjs/common';
import { CreateSubtopicDto } from './dto/create-subtopic.dto';
import { Collection } from 'src/database/config/collections';
import { DatabaseService } from 'src/database/database.service';
import { ISubtopic } from 'src/course/entities/subtopic.entity';
import { ITopic } from 'src/topic/entities/topic.entity';
import { DocumentData, DocumentReference, where } from 'firebase/firestore';
import { OpenAiService } from 'src/open-ai/open-ai.service';

@Injectable()
export class SubtopicService {
  private collectionName: Collection;

  constructor(
    private dbService: DatabaseService,
    private openAiService: OpenAiService,
  ) {
    this.collectionName = Collection.SUBTOPIC
  }

  async create(
    createSubtopicDto: CreateSubtopicDto
  ): Promise<DocumentReference<ISubtopic, DocumentData>> {
    return await this.dbService.create(this.collectionName, createSubtopicDto) as DocumentReference<ISubtopic, DocumentData>;
  }

  findAllByCourse(topicRef: DocumentReference<ITopic>): Promise<ISubtopic[]> {
    return this.dbService.getMany<ISubtopic>(this.collectionName, [where('topic', '==', topicRef)]);
  }

  async findOne(id: string) {
    return await this.dbService.getById<ISubtopic>(this.collectionName, id);
  }
}
