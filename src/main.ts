import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { loggerFactory } from './logger/logger-factory';

async function start() {
  try {
    const config = new DocumentBuilder()
      .setTitle('Rent-Car')
      .setDescription('Mini project for Rent-Car')
      .setVersion('1.0.0')
      .addTag(
        'NodeJs. NestJs, Postgres, Prisma, JWT, Swagger, Bot, SMS, Mailer',
      )
      .build();

    const PORT = process.env.PORT || 3030;

    const app = await NestFactory.create(AppModule, {
      logger: loggerFactory('Rent-Car'),
    });

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('/docs', app, document);

    app.use(cookieParser());

    app.setGlobalPrefix('api');

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(3000);
    console.log(`Server startted at: ${PORT}`);
  } catch (error) {
    console.log(error);
  }
}
start();
