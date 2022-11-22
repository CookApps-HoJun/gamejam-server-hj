import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';
import { PvpModule } from './pvp/pvp.module';
import { TempModule } from './temp/temp.module';
@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), AuthModule, UserModule, PvpModule, TempModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
