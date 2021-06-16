import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000

  // const options = new DocumentBuilder()
  //   .setTitle('My Learning example')
  //   .setDescription('The learning API description')
  //   .setVersion('1.0')
  //   .addTag('cats')
  //   .addBearerAuth({bearerFormat:"Backend"})
  //   .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('api', app, document);

  await app.listen(port);
  logger.log(`Application listening on port ${port}`)
}
bootstrap();
