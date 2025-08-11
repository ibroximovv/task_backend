import { Controller, Post, Body, Get, Param, Req, UseGuards, Res, ForbiddenException } from '@nestjs/common';
import { UrlService } from './url.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { ShortenUrlDto } from '../../type/url.dto';
import { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('URL Shortener')
@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) { }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Shorten a URL' })
  @ApiBody({ type: ShortenUrlDto })
  @ApiResponse({ status: 201, description: 'Shortened URL returned.' })
  @UseGuards(JwtAuthGuard)
  @Post('shorten')
  async shorten(@Body() dto: ShortenUrlDto, @Req() req: any) {
    return this.urlService.shorten(dto, req.user.sub);
  }

  @Get(':shortCode')
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const url = await this.urlService.redirect(shortCode);
    if (!url) return res.status(404).json({ message: 'Not found' });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.redirect(url.originalUrl);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get stats for a short URL' })
  @ApiResponse({ status: 200, description: 'Stats for the short URL.' })
  @UseGuards(JwtAuthGuard)
  @Get('stats/:shortCode')
  async stats(@Param('shortCode') shortCode: string, @Req() req: any) {
    const stats = await this.urlService.stats(shortCode, req.user.sub);
    if (!stats) throw new ForbiddenException('Not allowed');
    return stats;
  }
}
