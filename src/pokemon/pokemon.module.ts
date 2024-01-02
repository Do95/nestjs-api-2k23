import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { ApiModule } from 'src/api/api.module';
import { PokemonController } from './pokemon.controller';
import { CachingModule } from 'src/caching/caching.module';

@Module({
  imports: [ApiModule, CachingModule],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
