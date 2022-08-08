import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generate } from 'shortid';
import { Repository } from 'typeorm';
import { CreateShortenerDto } from './dto/create-shortener.dto';
import { Shortener } from './entities/shortener.entity';

@Injectable()
export class ShortenersService {
  constructor(
    @InjectRepository(Shortener)
    private shortenerRepository: Repository<Shortener>,
  ) {}

  async create(createShortenerDto: CreateShortenerDto) {
    const shortener = this.shortenerRepository.create({
      name: createShortenerDto.name,
      url: createShortenerDto.url,
      hash: await this.createHash(),
    });
    return this.shortenerRepository.save(shortener);
  }

  findAll() {
    return this.shortenerRepository.find();
  }

  findByhash(hash: string) {
    return this.shortenerRepository.findOneOrFail({
      where: { hash },
    });
  }

  findByUrl(url: string) {
    return this.shortenerRepository.findOneOrFail({
      where: { url },
    });
  }

  reactivate(shortener: Shortener) {
    return this.shortenerRepository.save({ ...shortener, created_at: new Date() });
  }

  async createHash(): Promise<string> {
    const hash = generate();
    const shortener = await this.shortenerRepository.findOne({ where: { hash } })
    if (shortener) return this.createHash()
    return hash
  }
}
