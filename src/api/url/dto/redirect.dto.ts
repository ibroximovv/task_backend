import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RedirectDto {
  @ApiProperty({
    example: 'abc12345',
    description: 'Qisqa URL kodi',
  })
  @IsNotEmpty()
  @IsString()
  shortCode: string;
}