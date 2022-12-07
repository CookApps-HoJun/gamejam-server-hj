import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './user/entities/user.entity';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  healthcheck(): string {
    return 'HI I AM HEALTHY 😄';
  }

  async onApplicationBootstrap(): Promise<void> {
    console.log('onApplicationBootstrap');

    const [result] = await this.entityManager
      .getRepository(User)
      .createQueryBuilder('user')
      .select('count(*) as count')
      .where("user.deviceId = 'dummy#0'")
      .execute();

    if (!+result.count) {
      const count = await this.entityManager
        .getRepository(User)
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(
          [...Array(1000).keys()].map((n) => ({
            deviceId: `dummy#${n}`,
            nickname: `dummy#${n}`,
          })),
        )
        .execute();
      console.log(count.raw.affectedRows, '개 더미 데이터 등록완료');
    }
  }
}
