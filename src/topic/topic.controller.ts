import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicService.create(createTopicDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicService.findOne(id);
  }
}
