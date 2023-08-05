import './utils/db';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
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
