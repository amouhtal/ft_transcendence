import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import fastifyCookie from 'fastify-cookie';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.register(fastifyCookie, {
  //   secret: 'my-secret', // for cookies signature
  // });
          // app.enableCors();
          app.useGlobalPipes(new ValidationPipe());
          app.enableCors();
          app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
