import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  public async getPokemons() {
    const { data } = await firstValueFrom(
      this.httpService.get(`https://pokeapi.co/api/v2/pokemon`).pipe(
        catchError((error) => {
          throw `An error happened. Msg: ${JSON.stringify(
            error?.response?.data,
          )}`;
        }),
      ),
    );
    return data;
  }

  public async getPokemon(name: string) {
    const { data } = await firstValueFrom(
      this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${name}`).pipe(
        catchError((error) => {
          throw `An error happened. Msg: ${JSON.stringify(
            error?.response?.data,
          )}`;
        }),
      ),
    );
    return data;
  }
}
