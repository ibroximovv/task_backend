import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { config } from 'src/config';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from 'src/infrastructure/lib/exeption/all.exeption.filter';


export default class Application {
  public static async main(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new AllExceptionsFilter());
    app.use(cookieParser());
    app.enableCors({
      origin: [
        'http://localhost:5173', 
        'http://localhost:3000',
        'http://localhost:8080',
        'https://ilyosbekibroximov.uz',
        'http://ilyosbekibroximov.uz',
        'https://another-allowed-origin.com',
        '*'
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });


    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        transform: true,
      }),
    );
    const api = 'api/v1';
    app.setGlobalPrefix(api);
    const config_swagger = new DocumentBuilder()
      .setTitle('Base app')
      .setVersion('1.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'Bearer',
        in: 'Header',
      })
      .build();
    const documentFactory = () =>
      SwaggerModule.createDocument(app, config_swagger);
    SwaggerModule.setup(api, app, documentFactory);
    await app.listen(config.PORT, () => {
      console.log(Date.now());
    });
  }
}