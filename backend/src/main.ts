import { AuthService } from '@mguay/nestjs-better-auth';
import { NestFactory } from '@nestjs/core';
import { toNodeHandler } from 'better-auth/node';
import 'dotenv/config';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  app.enableCors({
    origin: [
      process.env.WEB_SERVICE_dev_01,
      process.env.WEB_SERVICE_dev_02,
      process.env.WEB_SERVICE_03,
      process.env.WEB_SERVICE_04,
      process.env.WEB_SERVICE_05,
    ],
    credentials: true, // ถ้าใช้ cookies / session
  });
  // Access Express instance
  const expressApp = app.getHttpAdapter().getInstance();

  // Access BetterAuth instance from AuthService
  const authService = app.get<AuthService>(AuthService);

  expressApp.all(
    /^\/api\/auth\/.*/,
    toNodeHandler(authService.instance.handler),
  );

  expressApp.use(require('express').json());
  app.setGlobalPrefix('/api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
