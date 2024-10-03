import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [TopicController],
  providers: [TopicService, DatabaseService],
})
export class TopicModule {}
