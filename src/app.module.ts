import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';
import { PvpModule } from './pvp/pvp.module';
import { TempModule } from './temp/temp.module';
import { VersionSpecModule } from './version-spec/version-spec.module';
import { SkillModule } from './skill/skill.module';
import { CurrencyModule } from './currency/currency.module';
import { CharacterModule } from './character/character.module';
import { ChestModule } from './chest/chest.module';
import { PresetModule } from './preset/preset.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    AuthModule,
    UserModule,
    PvpModule,
    TempModule,
    VersionSpecModule,
    SkillModule,
    CurrencyModule,
    CharacterModule,
    ChestModule,
    PresetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
