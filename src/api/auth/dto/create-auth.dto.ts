import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({ example: 'example1@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password', minLength: 4 })
  @IsString()
  @MinLength(4)
  password: string;
}