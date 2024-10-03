import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { OpenAiModule } from './open-ai/open-ai.module';
import { UserModule } from './user/user.module';
import { FirebaseModule } from './firebase/firebase.module';
import { DatabaseModule } from './database/database.module';
import { CourseModule } from './course/course.module';
import { TopicModule } from './topic/topic.module';
import { SubtopicModule } from './subtopic/subtopic.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(__dirname, '../.env'),
    }),
    AuthModule,
    OpenAiModule,
    UserModule,
    FirebaseModule,
    DatabaseModule,
    CourseModule,
    TopicModule,
    SubtopicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
