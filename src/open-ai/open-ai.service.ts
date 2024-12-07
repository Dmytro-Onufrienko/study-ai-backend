import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
@Injectable()
export class OpenAiService {
  private openAI: OpenAI;

  constructor() {
    this.openAI = new OpenAI();
  }

  async createComplention<Response>(prompt: string): Promise<Awaited<Response>> {
    const completion = await this.openAI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: 'user', content: prompt }],
    });

    return JSON.parse(completion.choices[0].message.content);
  }
}
 