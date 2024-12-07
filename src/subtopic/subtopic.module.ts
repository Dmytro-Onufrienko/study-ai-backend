import { Module } from '@nestjs/common';
import { SubtopicService } from './subtopic.service';
import { SubtopicController } from './subtopic.controller';
import { DatabaseService } from 'src/database/database.service';
import { OpenAiService } from 'src/open-ai/open-ai.service';

@Module({
  controllers: [SubtopicController],
  providers: [SubtopicService, DatabaseService, OpenAiService],
})
export class SubtopicModule {}
