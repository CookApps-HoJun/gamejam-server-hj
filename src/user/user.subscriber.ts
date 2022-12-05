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
    // event.manager.getRepository(Skill).save();
    // 캐릭터데이터 생성 (최초는 없고 획득시 얻는걸로) 추후 최초 level, amount 모두 0으로 들고있을지 고민
    // event.manager.getRepository(Character).save();
  }
}
