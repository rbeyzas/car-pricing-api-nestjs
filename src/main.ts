import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // burası true olursa, dto'da tanımlanmayan property'leri ignore eder.
      //forbidNonWhitelisted: true, // bu da whitelist dışındaki property'leri engeller.
      // transform: true, // bu da gelen request'leri dto'ya dönüştürür.
    }),
  ); // bu pipe'ı kullanarak validation işlemlerini global olarak yapabiliriz.
  await app.listen(3000);
}
bootstrap();
// whitelist konusunda: diyelim ki dto da email ve password var. eğer whitelist true ise, gelen requestteki email ve password dışında bir şey varsa onu ignore eder.
// bunu yapma sebebimiz kullanıcılar ek içerik eklemeye çalışırsa bunları yok sayabiliriz.
