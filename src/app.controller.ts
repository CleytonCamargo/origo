import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ShortenersService } from './models/shorteners/shorteners.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly shortenerService: ShortenersService,
  ) {}

  @Get()
  welcome() {
    return 'Welcome to url shortener';
  }

  @Get('/:hash')
  async get(@Param('hash') hash: string, @Res() res: Response) {
    const shortener = await this.shortenerService.findByhash(hash);
    if (!shortener)
      throw new HttpException('Url not found', HttpStatus.NOT_FOUND);
    res.redirect(shortener.url);
  }
}
