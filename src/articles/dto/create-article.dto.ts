import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ required: false })
  description?: string;

  @IsNotEmpty()
  @ApiProperty()
  body: string;

  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}
