import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChestDto } from './dto/create-chest.dto';
import { UpdateChestDto } from './dto/update-chest.dto';
import { Chest } from './entities/chest.entity';

const chestInfo = {
  10001: {
    time: 60,
    random_card: 10,
    card_1: 0,
    card_2: 0,
    card_3: 0,
    card_4: 0,
  },
  20001: {
    time: 180,
    random_card: 27,
    card_1: 0,
    card_2: 3,
    card_3: 0,
    card_4: 0,
  },
  30001: {
    time: 480,
    random_card: 98,
    card_1: 0,
    card_2: 0,
    card_3: 2,
    card_4: 0,
  },
  40001: {
    time: 1440,
    random_card: 299,
    card_1: 0,
    card_2: 0,
    card_3: 0,
    card_4: 1,
  },
};

const skill = {
  grade: {
    1: [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011],
    2: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009],
    3: [3001, 3002, 3003, 3004, 3005, 3006, 3007],
    4: [4001, 4002, 4003, 4004, 4005],
  },
};

const weighted = [
  ...skill.grade[1].map((value) => ({
    value,
    probability: 700 / 1000 / skill.grade[1].length,
  })),
  ...skill.grade[2].map((value) => ({
    value,
    probability: 240 / 1000 / skill.grade[2].length,
  })),
  ...skill.grade[3].map((value) => ({
    value,
    probability: 55 / 1000 / skill.grade[3].length,
  })),
  ...skill.grade[4].map((value) => ({
    value,
    probability: 5 / 1000 / skill.grade[4].length,
  })),
];

const randomizer = (values) => {
  let i,
    pickedValue,
    randomNr = Math.random(),
    threshold = 0;

  for (i = 0; i < values.length; i++) {
    threshold += values[i].probability;
    if (threshold > randomNr) {
      pickedValue = values[i].value;
      break;
    }
  }
  return pickedValue;
};
const openChest = (id) => {
  let result = [];
  for (let i = 0; i < chestInfo[id].random_card; i++) {
    result.push(randomizer(weighted));
  }
  for (let i = 0; i < chestInfo[id].card_1; i++) {
    result.push(
      randomizer(
        skill.grade[1].map((value) => ({
          value,
          probability: 1 / skill.grade[1].length,
        })),
      ),
    );
  }
  for (let i = 0; i < chestInfo[id].card_2; i++) {
    result.push(
      randomizer(
        skill.grade[2].map((value) => ({
          value,
          probability: 1 / skill.grade[2].length,
        })),
      ),
    );
  }
  for (let i = 0; i < chestInfo[id].card_3; i++) {
    result.push(
      randomizer(
        skill.grade[3].map((value) => ({
          value,
          probability: 1 / skill.grade[3].length,
        })),
      ),
    );
  }
  for (let i = 0; i < chestInfo[id].card_4; i++) {
    result.push(
      randomizer(
        skill.grade[4].map((value) => ({
          value,
          probability: 1 / skill.grade[4].length,
        })),
      ),
    );
  }
  return result;
};

// const randomPick = (grade) => grade[Math.floor(Math.random() * grade.length)];

@Injectable()
export class ChestService {
  constructor(
    @InjectRepository(Chest)
    private chestRepo: Repository<Chest>,
  ) {}

  async open(id, uid) {
    const chest = await this.chestRepo.findBy({ id, uid });

    const openTime = chest[0].openTime?.valueOf() / 1000;
    const now = Date.now() / 1000;
    if (!chest.length) {
      throw new HttpException('DB Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (chest[0].amount <= 0) {
      throw new HttpException('Not Enough', HttpStatus.BAD_REQUEST);
    }

    if (now >= openTime + chestInfo[id] && !openTime) {
      throw new HttpException('OpenTime not yet', HttpStatus.BAD_REQUEST);
    }

    // 처음이거나(오픈타임이 없거나) 현재시간 >= 마지막 오픈 시간 + 여는데 걸리는 시간
    const { createdAt, updatedAt, ...updated } = await this.chestRepo.save({
      ...chest[0],
      amount: chest[0].amount - 1,
      openTime: new Date(),
    });

    return {
      rewardSkills: openChest(id),
      updated,
    };
  }

  async get(id, uid) {
    const chest = await this.chestRepo.findBy({ id, uid });
    return await this.chestRepo.save({
      ...chest[0],
      amount: chest[0].amount + 1,
    });
  }
}
