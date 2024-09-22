import { Controller, Get } from '@nestjs/common';
import { OpenAiService } from './open-ai.service';

@Controller('open-ai')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Get()
  async jokeCheck() {
    return this.openAiService.jokeCheck();
  }
}
