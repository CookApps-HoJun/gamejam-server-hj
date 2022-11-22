import { Pvp } from "src/pvp/entities/pvp.entity";
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from "typeorm";
import { User } from "./entities/user.entity";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async afterInsert(event: InsertEvent<User>) {
    const user = event.entity;
    console.log(`AFTER USER INSERTED: `, event.entity);
    await event.manager.getRepository(Pvp).save({
      user,
      score: 1000,
      yesterdayRank: null,
    });
  }
}
