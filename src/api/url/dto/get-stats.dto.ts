import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetStatsDto {
  @ApiProperty({
    example: 'abc12345',
    description: 'Statistikasi olinadigan qisqa URL kodi',
  })
  @IsNotEmpty()
  @IsString()
  shortCode: string;
}