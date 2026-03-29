import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 전역 유효성 검사 파이프 (입력값 검증)
  app.useGlobalPipes(new ValidationPipe());

  // 프론트엔드와의 통신을 위한 CORS 설정
  app.enableCors({
    origin: [
      'http://localhost:3000', // 로컬 개발용 주소 (유지)
      'https://paynplus-admin.vercel.app', // Vercel 배포 주소 (여기에 실제 발급받은 주소 입력!)
    ],
    credentials: true,
  });

  // 필리핀 현지 서비스 포트 설정
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`[PG-ADMIN-BACKEND] Application is running on: http://localhost:${port}`);
}
bootstrap();