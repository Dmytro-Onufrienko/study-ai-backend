import { Module } from '@nestjs/common';
import { BaseApiService } from './base-api.service';

@Module({
  providers: [BaseApiService]
})
export class BaseApiModule {}
