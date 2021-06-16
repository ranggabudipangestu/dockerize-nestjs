import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AddressModule } from './address/address.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDB } from './config/db.config';
import { UserSeedModule } from "./users/seeder/user.seeder.module";
import { CommandModule } from "nestjs-command";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CommandModule,
    ConfigModule.forRoot({envFilePath:`.env.stage.${process.env.STAGE}`, isGlobal:true}),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],  
      useFactory: async (configService:ConfigService) => {
        const isProd = configService.get('STAGE') === "prod" ? true:false
        return configDB(configService, isProd)
      }
    }),  
    UsersModule, AddressModule, UserSeedModule, AuthModule],
})
export class AppModule {}
