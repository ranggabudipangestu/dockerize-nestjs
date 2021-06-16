import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { UsersModule } from '../users.module';
import { UserSeed } from './user.seeder';


@Module({
    imports: [CommandModule, UsersModule],
    providers: [UserSeed],
    exports: [UserSeed],
})
export class UserSeedModule {}