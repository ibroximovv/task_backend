import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty({
    example: 'https://example.com'
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  originalUrl: string;
}