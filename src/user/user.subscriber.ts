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
    await event.manager.getRepository(Skill).save([
      { user, id: 1, level: 1, amount: 0 },
      { user, id: 2, level: 1, amount: 0 },
      { user, id: 5, level: 1, amount: 0 },
      { user, id: 6, level: 1, amount: 0 },
      { user, id: 8, level: 1, amount: 0 },
      { user, id: 9, level: 1, amount: 0 },
    ]);
    await event.manager.getRepository(Preset).save([
      { user, id: 1, skills: '[1,2,5,6,8,9]' },
      { user, id: 2, skills: '[1,2,5,6,8,9]' },
      { user, id: 3, skills: '[1,2,5,6,8,9]' },
    ]);

    // 캐릭터데이터 생성 (최초는 없고 획득시 얻는걸로) 추후 최초 level, amount 모두 0으로 들고있을지 고민
    // event.manager.getRepository(Character).save();
  }
}
