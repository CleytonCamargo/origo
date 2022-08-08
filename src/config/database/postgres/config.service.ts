import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgresConfigService {
  constructor(private configService: ConfigService) {}

  get name(): string {
    return this.configService.get<string>('database.postgres.name');
  }

  get user(): string {
    return this.configService.get<string>('database.postgres.user');
  }

  get password(): string {
    return this.configService.get<string>('database.postgres.password');
  }

  get host(): string {
    return this.configService.get<string>('database.postgres.host');
  }

  get port(): number {
    return Number(this.configService.get<number>('database.postgres.port'));
  }
}
