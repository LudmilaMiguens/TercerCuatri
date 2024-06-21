import { NestFactory } from '@nestjs/core';
import { CameraModule } from './camera.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(CameraModule);
app.useGlobalPipes(new ValidationPipe({whitelist:true}),
);
app.enableCors();
await app.listen(3000);
}
bootstrap();
