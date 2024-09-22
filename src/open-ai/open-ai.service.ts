import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private openAI: OpenAI;

  constructor() {
    this.openAI = new OpenAI();
  }

  async jokeCheck() {
    const completion = await this.openAI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: 'user', content: 'write a haiku about ai' }],
    });

    return completion.choices;
  }
}
