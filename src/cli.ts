import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { AppModule } from './app.module';
//FOR SEEDING DATA
(async () => {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: true
  });
  app
    .select(CommandModule)
    .get(CommandService)
    .exec();
})();