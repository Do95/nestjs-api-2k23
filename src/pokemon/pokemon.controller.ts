import { Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { ApiTags } from '@nestjs/swagger';
import { CacheTTL } from '@nestjs/cache-manager';

@Controller({
  version: ['1'],
  path: 'pokemons',
})
@ApiTags('Pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('/')
  public getPokemons() {
    return this.pokemonService.getAll();
  }

  @Get('/:name')
  @CacheTTL(200)
  public getPokemon(@Param('name') name: string) {
    return this.pokemonService.getByName(name);
  }
}
