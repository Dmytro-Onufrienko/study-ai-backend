import { DocumentData, DocumentReference, where } from 'firebase/firestore';
import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto';
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

  async create({ name, subtopics, course }: CreateTopicDto) {
    const topic = await this.dbService.create(this.collectionName, { name, course }) as DocumentReference<ITopic>

    const subtopicRefs: DocumentReference<ISubtopic>[] = await Promise.all(subtopics.map((subtopic: string) => {
      return this.subtopicService.create({name: subtopic, topic})
    }))
    
    await this.dbService.update<ITopic>(this.collectionName, topic.id, { subtopics: subtopicRefs });

    return topic;
  }

  async findOne(id: string) {
    const topic = await this.dbService.getById<ITopic>(this.collectionName, id);

    if (!topic.subtopics || topic.subtopics.length === 0) {
      return { ...topic, subtopics: [] };
    }

    const subtopicIds = topic.subtopics.map(
      (subtopicRef: DocumentReference<ISubtopic>) => subtopicRef.id
    );

    const subtopics = await this.dbService.getMany<ISubtopic>(Collection.SUBTOPIC, [
      where('__name__', 'in', subtopicIds),
    ]);
  
    return {
      ...topic,
      subtopics,
    };
  }

  findAllByCourse(courseRef: DocumentReference<ICourse>): Promise<ITopic[]> {
    return this.dbService.getMany<ITopic>(this.collectionName, [where('course', '==', courseRef)]);
  }
}
