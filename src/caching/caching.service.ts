import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as dayjs from 'dayjs';
import { CachingOptionsDto } from './dto/caching-options.dto';
import { CachingTimeEnum } from './enum/caching-time.enum';
import { CachedDataResponse } from './interface/cached-data.interface';

@Injectable()
export class CachingService {
  private cachingOptions: CachingOptionsDto;
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {
    this.cachingOptions = {
      time: 20,
      period: CachingTimeEnum.SECONDS,
    };
  }

  public async set<T>(
    keyName: string,
    data?: T,
    options?: CachingOptionsDto,
  ): Promise<T> {
    const cachedOptions = this.setCachingOptions(options);
    console.log('Options', cachedOptions);
    const time = dayjs().add(cachedOptions.time, cachedOptions.period).unix();
    await this.cacheService.set(keyName.toString(), {
      timestamp: time,
      data: data,
    });
    const cachedData = await this.cacheService.get<CachedDataResponse<T>>(
      keyName.toString(),
    );
    return cachedData.data;
  }

  public async get<T = any>(keyName: string): Promise<T> {
    const cachedData = await this.cacheService.get<CachedDataResponse<T>>(
      keyName.toString(),
    );
    return cachedData.data;
  }

  public async getOrResetCaching<T = any>(keyName: string) {
    const cachedData = await this.cacheService.get<CachedDataResponse<T>>(
      keyName.toString(),
    );
    if (!cachedData) return;
    const currentTime = dayjs().unix();
    if (cachedData.timestamp - currentTime > 0) {
      return cachedData.data;
    }
    await this.cacheService.del(keyName.toString());
    return;
  }

  public async delete(keyName: string): Promise<void> {
    await this.cacheService.del(keyName.toString());
  }

  private setCachingOptions(options: CachingOptionsDto): CachingOptionsDto {
    if (options == null || options == undefined) {
      return {
        time: this.cachingOptions.time,
        period: this.cachingOptions.period,
      };
    }

    const keys = Object.keys(options);
    const keyOptions = ['time', 'period'];
    for (const key in keyOptions) {
      if (!keys.includes(key)) options[key] = this.cachingOptions[key];
    }
    return options;
  }
}
