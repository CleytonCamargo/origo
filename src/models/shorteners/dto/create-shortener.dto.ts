import { IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateShortenerDto {
  @IsNotEmpty()
  @Length(50)
  name: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;
}
