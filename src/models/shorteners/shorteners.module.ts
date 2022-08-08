import { Module } from '@nestjs/common';
import { ShortenersService } from './shorteners.service';
import { ShortenersController } from './shorteners.controller';
import { Shortener } from './entities/shortener.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Shortener])],
  controllers: [ShortenersController],
  providers: [ShortenersService],
})
export class ShortenersModule {}
