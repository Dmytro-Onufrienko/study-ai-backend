import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { getCreateCoursePropmt } from './prompts/getCreateCoursePrompt';
import { ICourseResponse } from 'src/course/interfaces/course-response.interface';

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

  async createCourse(courseTopic: string): Promise<ICourseResponse> {
    const prompt = getCreateCoursePropmt(courseTopic);
    const completion = await this.openAI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: 'user', content: prompt }],
    });

    return JSON.parse(completion.choices[0].message.content);
  }
}
