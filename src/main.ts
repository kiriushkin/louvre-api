import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const { PORT, NODE_ENV } = process.env;

async function bootstrap() {
  const httpsOptions =
    NODE_ENV === 'production'
      ? {
          key: fs.readFileSync(`./keys/privkey.pem`),
          cert: fs.readFileSync(`./keys/fullchain.pem`),
        }
      : null;

  const app = await NestFactory.create(AppModule, { httpsOptions });

  const config = new DocumentBuilder()
    .setTitle('Louvre-API')
    .setDescription('An API')
    .setVersion('0.3')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(PORT ?? 3000);
}
bootstrap();
