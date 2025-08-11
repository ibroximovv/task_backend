import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Url } from './schema/url.schema';
import { nanoid } from 'nanoid';
import { ShortenUrlDto } from '../../type/url.dto';
import { UrlStatsResponse } from '../../type/indexType';
import { config } from 'src/config';

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(Url.name) private urlModel: Model<Url>,
  ) {}

  async shorten(dto: ShortenUrlDto, userId: string) {
    const shortCode = nanoid(7);
    const url = new this.urlModel({
      originalUrl: dto.originalUrl,
      shortCode,
      userId: new Types.ObjectId(userId),
      visits: 0,
    });
    await url.save();
    return {
      shortCode,
      shortUrl: `${config.API_BASE_URL}/${shortCode}`,
    };
  }

  async redirect(shortCode: string) {
    const url = await this.urlModel.findOne({ shortCode });
    if (!url) return null;
    url.visits += 1;
    await url.save();
    return url;
  }

  async stats(shortCode: string, userId: string): Promise<UrlStatsResponse | null> {
    const url = await this.urlModel.findOne({ shortCode });
    if (!url) return null;
    if (url.userId.toString() !== userId) throw new ForbiddenException();
    return {
      originalUrl: url.originalUrl,
      visits: url.visits,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt,
    };
  }
}
