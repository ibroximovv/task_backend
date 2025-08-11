import { IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ShortenUrlDto {
  @ApiProperty({ example: 'https://example.com', description: 'Original URL to shorten' })
  @IsUrl()
  originalUrl: string;
}

export class RefreshTokenDto {
  @ApiProperty({ example: 'your-refresh-token', description: 'Refresh token string' })
  @IsString()
  refreshToken: string;
}
