import { Pvp } from 'src/pvp/entities/pvp.entity';
import { Currency } from 'src/currency/entities/currency.entity';
import { Chest } from 'src/chest/entities/chest.entity';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from './entities/user.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { Preset } from 'src/preset/entities/preset.entity';
import { PresetSkill } from 'src/preset/entities/preset-skill.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async afterInsert(event: InsertEvent<User>) {
    console.log('afterInsert Start');

    const user = event.entity;
    // pvp정보 생성
    await event.manager.getRepository(Pvp).save({
      user,
      score:
        1000 +
        (user.deviceId.includes('dummy')
          ? parseInt(user.deviceId.split('#')[1]) * 2
          : 0),
      yesterdayRank: null,
    });

    // 재화데이터 생성
    await event.manager
      .getRepository(Currency)
      .save({ user, coin: 0, jewel: 0, key: 0 });

    // 상자데이터 생성
    await event.manager
      .getRepository(Chest)
      .insert([10001, 20001, 30001, 40001].map((id) => ({ user, id })));
    // 스킬데이터 생성 (최초는 없고 획득시 얻는걸로) 추후 최초 level, amount 모두 0으로 들고있을지 고민
    const s1 = await event.manager
      .getRepository(Skill)
      .save({ user, id: 1, level: 1, amount: 0 });
    const s2 = await event.manager
      .getRepository(Skill)
      .save({ user, id: 2, level: 1, amount: 0 });
    const s3 = await event.manager
      .getRepository(Skill)
      .save({ user, id: 5, level: 1, amount: 0 });
    const s4 = await event.manager
      .getRepository(Skill)
      .save({ user, id: 6, level: 1, amount: 0 });
    const s5 = await event.manager
      .getRepository(Skill)
      .save({ user, id: 8, level: 1, amount: 0 });
    const s6 = await event.manager
      .getRepository(Skill)
      .save({ user, id: 9, level: 1, amount: 0 });

    // 프리셋설정
    await event.manager.getRepository(Preset).save([
      {
        user,
        id: 1,
      },
      {
        user,
        id: 2,
      },
      {
        user,
        id: 3,
      },
    ]);

    const { uid } = user;

    await event.manager.getRepository(PresetSkill).save([
      {
        preset: {
          user,
          id: 1,
        },
        skill: s1,
        order: 1,
      },
      {
        preset: {
          user,
          id: 1,
        },
        skill: s2,
        order: 2,
      },
      {
        preset: {
          user,
          id: 1,
        },
        skill: s3,
        order: 3,
      },
      {
        preset: {
          user,
          id: 1,
        },
        skill: s4,
        order: 4,
      },
      {
        preset: {
          user,
          id: 1,
        },
        skill: s5,
        order: 5,
      },
      {
        preset: {
          user,
          id: 1,
        },
        skill: s6,
        order: 6,
      },
    ]);

    // 캐릭터데이터 생성 (최초는 없고 획득시 얻는걸로) 추후 최초 level, amount 모두 0으로 들고있을지 고민
    // event.manager.getRepository(Character).save();
  }
}
