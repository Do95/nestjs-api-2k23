import { ApiService } from 'src/api/api.service';
import { Injectable } from '@nestjs/common';
import { CachingService } from 'src/caching/caching.service';

@Injectable()
export class PokemonService {
  constructor(
    private readonly apiService: ApiService,
    private readonly cacheService: CachingService,
  ) {}

  public async getAll(): Promise<any> {
    return this.apiService.getPokemons();
  }

  public async getByName(name: string): Promise<any> {
    const cachedData = await this.cacheService.getOrResetCaching(name);
    if (cachedData) {
      console.log('WITH CACHING');
      return cachedData;
    }
    console.log('SET CACHING');
    const pokemon = await this.apiService.getPokemon(name);
    if (pokemon) return this.cacheService.set(name, pokemon);
  }
}
