import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Preset } from 'src/preset/entities/preset.entity';
import { In, Between, Repository, Not } from 'typeorm';
import { Pvp } from './entities/pvp.entity';
import { PvpResult } from './entities/pvpResult.entity';

@Injectable()
export class PvpService {
  constructor(
    @InjectRepository(Pvp)
    private pvpRepo: Repository<Pvp>,
    @InjectRepository(Preset)
    private presetRepo: Repository<Preset>,
    @InjectRepository(PvpResult)
    private pvpResultRepo: Repository<PvpResult>,
  ) {}

  async getRank() {
    return await this.pvpRepo.find({
      relations: ['user'],
      take: 100,
      order: {
        score: 'DESC',
      },
    });
  }

  async getEnemy(uid: number) {
    console.log('a');

    console.log(await this.pvpRepo.findOneBy({ user: { uid } }));

    const userScore = (await this.pvpRepo.findOneBy({ user: { uid } })).score;

    const upperBound = userScore * 0.05;

    let userPool = await this.pvpRepo.find({
      relations: ['user'],
      where: {
        score: Between(userScore - upperBound, userScore + upperBound),
        user: Not(uid),
      },
    });

    if (!userPool.length) {
      const [{ rank }] = await this.pvpRepo.manager.query(`
        SELECT rank
        FROM
          (
            SELECT 
              @rownum:=@rownum+1  rank, 
              pvp.* 
            FROM 
              pvp, 
              (SELECT @ROWNUM := 0) R
            ORDER BY
              score desc
          ) list
        WHERE uid = ${uid} ;
      `);

      userPool = await this.pvpRepo.find({
        relations: ['user'],
        where: {
          user: Not(uid),
        },
        skip: Math.max(rank - 5, 0),
        take: 10,
      });
    }

    const randomNumber = Math.floor(Math.random() * userPool.length);

    const enemy = userPool[randomNumber];

    const { uid: enemyId, presetId } = enemy.user;

    // const [{ skills }] = await this.pvpRepo.manager.query(`
    //     SELECT skills
    //     FROM preset
    //     WHERE uid = ${enemyId}
    //     AND id = ${presetId};
    //   `);

    console.log('b');

    const [{ presetSkills }] = await this.presetRepo.find({
      relations: ['skill'],
      where: {
        id: presetId,
        uid: enemyId,
      },
    });
    console.log(presetSkills);

    return {
      ...enemy,
      user: {
        ...enemy.user,
        // skills: skills.map((s) => {
        //   const { uid, amount, ...result } = s;
        //   return result;
        // }),
      },
    };
  }

  async calcScore(user, enemy, result) {
    const pvpRecord = await this.pvpRepo.find({
      where: { user: In([user, enemy]) },
    });

    const userPbefore = pvpRecord.find((p) => p.uid === user).score; // 유저 스코어
    const enemyPbefore = pvpRecord.find((p) => p.uid === enemy).score; // 적 스코어

    const k = 20; // 가중치
    const w = result; // 유저 기준 경기결과 (승리: 1, 패배: 0)
    const we = 1 / (10 ** ((enemyPbefore - userPbefore) / 600) + 1); // 예측된 경기 결과

    return {
      pBefore: userPbefore,
      pAfter: userPbefore + Math.round(k * (w - we)),
    };
  }

  async updateScore(uid, score) {
    const pvp = await this.pvpRepo.findOneBy({ user: { uid } });

    return await this.pvpRepo.save({ ...pvp, score });
  }
}
