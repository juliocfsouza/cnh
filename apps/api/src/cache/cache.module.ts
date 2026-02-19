import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { RedisCacheService } from './redis-cache.service';

@Module({
  providers: [
    {
      provide: CacheService,
      useClass: RedisCacheService,
    },
  ],
  exports: [CacheService],
})
export class CacheModule {}
