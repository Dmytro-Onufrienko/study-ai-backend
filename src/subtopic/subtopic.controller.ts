import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SubtopicService } from './subtopic.service';
import { CreateSubtopicDto } from './dto/create-subtopic.dto';

@Controller('subtopic')
export class SubtopicController {
  constructor(private readonly subtopicService: SubtopicService) {}

  @Post()
  create(@Body() createSubtopicDto: CreateSubtopicDto) {
    return this.subtopicService.create(createSubtopicDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subtopicService.findOne(id);
  }
}
