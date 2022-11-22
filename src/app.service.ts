import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthcheck(): string {
    return 'HI I AM HEALTHY 😄';
  }
}
