import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';
import { CachingService } from './caching.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        }),
      }),
    }),
  ],
  providers: [CachingService],
  exports: [CachingService],
})
export class CachingModule {}
