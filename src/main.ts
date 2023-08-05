import './utils/db';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { PORT, SSL_PATH } = process.env;

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(`./keys/privkey.pem`),
    cert: fs.readFileSync(`./keys/fullchain.pem`),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });
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
