import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Shortener } from './models/shorteners/entities/shortener.entity';
import { ShortenersModule } from './models/shorteners/shorteners.module';
import { ShortenersService } from './models/shorteners/shorteners.service';
import { PostgresDatabaseProviderModule } from './providers/database/postgres/provider.module';

@Module({
  imports: [
    ShortenersModule,
    PostgresDatabaseProviderModule,
    TypeOrmModule.forFeature([Shortener]),
  ],
  controllers: [AppController],
  providers: [AppService, ShortenersService],
})
export class AppModule {}
