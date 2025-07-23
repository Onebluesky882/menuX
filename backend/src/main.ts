import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://menu-x-five.vercel.app/',
      'http://localhost:3001',
    ], // Update Prod Origin
    credentials: true,
  });
  Logger.log('Application started...');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
