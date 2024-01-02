import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    ApiModule,
    PokemonModule,
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
})
export class AppModule {}
