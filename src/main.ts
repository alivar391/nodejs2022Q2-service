import { SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { dirname, join } from 'path';
import { parse } from 'yaml';
import { AppModule } from './app.module';
import { readFile } from 'fs/promises';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

const PORT = process.env.PORT || 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const rootDirname = dirname(__dirname);
  const DOC_API = await readFile(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');
  const document = parse(DOC_API);

  SwaggerModule.setup('doc', app, document);
  await app.listen(PORT);
}

bootstrap();
