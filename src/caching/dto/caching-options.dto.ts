import { CachingTimeEnum } from '../enum/caching-time.enum';

export class CachingOptionsDto {
  time?: number;
  period?: CachingTimeEnum;
}
