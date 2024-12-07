import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { DatabaseService } from 'src/database/database.service';
import { SubtopicService } from 'src/subtopic/subtopic.service';
import { OpenAiService } from 'src/open-ai/open-ai.service';

@Module({
  controllers: [TopicController],
  providers: [TopicService, DatabaseService, SubtopicService, OpenAiService],
})
export class TopicModule {}
