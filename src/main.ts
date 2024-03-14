import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import { customLogger as logger } from './logger/logger';
var httpContext = require('express-http-context');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(httpContext.middleware);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  const port = 3000;
  await app.listen(port);
  logger.info(`Application listening on port ${port}`)
}
bootstrap();
