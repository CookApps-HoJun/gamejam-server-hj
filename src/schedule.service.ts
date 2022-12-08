import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
@Injectable()
export class ScheduleService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}
  private readonly logger = new Logger(ScheduleService.name);

  @Cron('0 0 0 * * *', { name: 'cronTask' })
  // @Interval(10000)
  async handleCron() {
    this.logger.debug('yesterday rank 갱신');
    await this.entityManager.query(`
        UPDATE pvp, (
          SELECT 
            @rownum:=@rownum+1  rank, 
            p.* 
          FROM 
            (
              SELECT pvp.* from pvp 
              LEFT JOIN user
              ON pvp.uid = user.uid
              WHERE
                (
                  deviceId LIKE 'dummy#%'
                  AND
                  score <= 1200
                )
              OR deviceId NOT LIKE 'dummy#%'
            ) p, 
            (SELECT @ROWNUM := 0) R
          ORDER BY score desc
        ) list
        SET pvp.yesterdayRank = list.rank
        WHERE pvp.uid = list.uid
        ;
      `);
  }
}
