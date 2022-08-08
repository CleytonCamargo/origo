import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ShortenersService } from './shorteners.service';
import { CreateShortenerDto } from './dto/create-shortener.dto';

@Controller('shorteners')
export class ShortenersController {
  constructor(private readonly shortenersService: ShortenersService) {}

  @Post()
  async create(@Body() createShortenerDto: CreateShortenerDto) {
    const urlShortened = await this.shortenersService.findByUrl(
      createShortenerDto.url,
    );
    if (urlShortened) {
      if (!urlShortened.expired)
        throw new HttpException(
          'This url has an active shortener',
          HttpStatus.FORBIDDEN,
        );
      return this.shortenersService.reactivate(urlShortened);
    }
    return this.shortenersService.create(createShortenerDto);
  }
}
