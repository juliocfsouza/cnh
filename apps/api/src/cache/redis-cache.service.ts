import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { CacheService } from './cache.service';

@Injectable()
export class RedisCacheService extends CacheService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisCacheService.name);
  private readonly client: Redis | null = null;

  constructor() {
    super();
    const url = process.env.REDIS_URL;
    if (url) {
      try {
        this.client = new Redis(url, { lazyConnect: true, enableOfflineQueue: false });
        this.client.on('error', (err: Error) => {
          this.logger.warn(`Redis error: ${err.message}`);
        });
      } catch {
        this.logger.warn('Redis unavailable, cache disabled');
      }
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.client) return null;
    try {
      const val = await this.client.get(key);
      return val ? (JSON.parse(val) as T) : null;
    } catch {
      return null;
    }
  }

  async set<T>(key: string, value: T, ttlSeconds = 60): Promise<void> {
    if (!this.client) return;
    try {
      await this.client.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    } catch {
      // silently ignore
    }
  }

  async del(key: string): Promise<void> {
    if (!this.client) return;
    try {
      await this.client.del(key);
    } catch {
      // silently ignore
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.client) {
      await this.client.quit();
    }
  }
}
