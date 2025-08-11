export interface JwtPayload {
  sub: string;
  email: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface ShortenUrlDto {
  originalUrl: string;
}

export interface ShortenUrlResponse {
  shortCode: string;
  shortUrl: string;
}

export interface UrlStatsResponse {
  originalUrl: string;
  visits: number;
  createdAt: Date;
  expiresAt?: Date;
}
