import { AuthService } from '@mguay/nestjs-better-auth';
import { NestFactory } from '@nestjs/core';
import { toNodeHandler } from 'better-auth/node';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  // Access Express instance
  const expressApp = app.getHttpAdapter().getInstance();

  // Access BetterAuth instance from AuthService
  const authService = app.get<AuthService>(AuthService);

  expressApp.all(
    /^\/api\/auth\/.*/,
    toNodeHandler(authService.instance.handler),
  );

  expressApp.use(require('express').json());
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
