import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prefix = '/api/v1';

  app.enableCors();

  app.setGlobalPrefix(prefix);

  const apiDocConfig = new DocumentBuilder()
    .setTitle('Nest Crash API')
    .setDescription('Nest api documentation for crash project')
    .setVersion('1.0')
    .setContact('Emmanuel Bonke', 'www.github.com', 'sirmanuel4@gmail.com')
    .addBearerAuth()
    .build();

  const apiDocs = SwaggerModule.createDocument(app, apiDocConfig);

  const port = process.env.PORT;

  SwaggerModule.setup(`${prefix}/docs`, app, apiDocs);

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}${prefix}`);
}
bootstrap();
