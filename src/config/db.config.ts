import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql', //Database 설정
  host: '15.164.218.52',
  port: 3306,
  username: 'bmserver',
  password: 'abcd1234',
  database: 'bm_server',
  entities: ['dist/**/**/*.entity.{ts,js}'], // Entity 연결
  synchronize: true, //true 값을 설정하면 어플리케이션을 다시 실행할 때 엔티티안에서 수정된 컬럼의 길이 타입 변경값등을 해당 테이블을 Drop한 후 다시 생성해준다.
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
};
