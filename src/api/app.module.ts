import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UrlModule } from './url/url.module';

@Module({
  imports: [AuthModule,
    ConfigModule.forRoot(), // .env ishlatish uchun
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/mydb'), UrlModule,
  ],
})
export class AppModule {}
