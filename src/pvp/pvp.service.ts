import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Preset } from 'src/preset/entities/preset.entity';
import { Temp } from 'src/temp/entities/temp.entity';
import { In, Between, Repository, Not, Like, LessThanOrEqual } from 'typeorm';
import { Pvp } from './entities/pvp.entity';
import { PvpResult } from './entities/pvpResult.entity';

@Injectable()
export class PvpService {
  constructor(
    @InjectRepository(Pvp)
    private pvpRepo: Repository<Pvp>,
    @InjectRepository(Preset)
    private presetRepo: Repository<Preset>,
    @InjectRepository(Temp)
    private tempResultRepo: Repository<Temp>,
  ) {}

  async getRank(uid) {
    let result = await this.pvpRepo.find({
      take: 10,
      where: [
        {
          user: {
            deviceId: Like('dummy#%'),
          },
          score: LessThanOrEqual(1200),
        },
        {
          user: {
            deviceId: Not(Like('dummy#%')),
          },
        },
      ],
      order: {
        score: 'DESC',
      },
    });

    const uids = result.map((r) => r.uid);

    const userDatas = await this.tempResultRepo.find({
      where: {
        uid: In(uids),
        type: In(['UserData', 'RemoteUserData']),
      },
    });

    const [{ rank, yesterdayRank }] = await this.pvpRepo.manager.query(`
      SELECT *
      FROM
        (
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
        WHERE uid = ${uid}
      `);

    // console.log(result);
    // console.log('--');
    // console.log(userDatas);

    const a = result.map((r) => {
      const u = userDatas
        .map((u) => ({
          ...uid,
          data: JSON.parse(u.data),
        }))
        .filter((u) => r.uid === u.data.uid)[0];
      return {
        ...r,
        nickname: u.data.nickName ? u.data.nickName : u.data.nickname,
        cid: +(u.data.cid ? u.data.cid : u.data.cid),
      };
    });
    return {
      myRank: { rank, yesterdayRank },
      rankData: a,
    };
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
        order: {
          score: 'DESC',
        },
        skip: Math.max(rank - 5, 0),
        take: 10,
      });
    }

    const randomNumber = Math.floor(Math.random() * userPool.length);

    const enemy = userPool[randomNumber];

    const { uid: enemyId, presetId } = enemy.user;

    const [{ presetSkills }] = await this.presetRepo.find({
      relations: ['presetSkills.skill'],
      where: {
        id: presetId,
        uid: enemyId,
      },
    });

    const skills = presetSkills
      .sort(({ order: a }, { order: b }) => a - b)
      .map((s) => {
        const { uid, amount, ...result } = s.skill;
        return result;
      });

    return {
      ...enemy,
      user: {
        ...enemy.user,
        skills,
      },
    };
  }

  async calcScore(user, enemy, result) {
    const pvpRecord = await this.pvpRepo.find({
      where: { user: In([user, enemy]) },
    });

    const userPbefore = pvpRecord.find((p) => p.uid === user).score; // ?????? ?????????
    const enemyPbefore = pvpRecord.find((p) => p.uid === enemy).score; // ??? ?????????

    const k = 20; // ?????????
    const w = result; // ?????? ?????? ???????????? (??????: 1, ??????: 0)
    const we = 1 / (10 ** ((enemyPbefore - userPbefore) / 600) + 1); // ????????? ?????? ??????

    return {
      pBefore: userPbefore,
      pAfter: Math.max(userPbefore + Math.round(k * (w - we)), 1000), //1000??? ????????? ???????????????
    };
  }

  async updateScore(uid, score) {
    const pvp = await this.pvpRepo.findOneBy({ user: { uid } });

    return await this.pvpRepo.save({ ...pvp, score });
  }
}
