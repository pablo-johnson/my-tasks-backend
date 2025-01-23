import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {

  @ApiProperty({
    description: 'The user email address (optional)',
    type: String,
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'The user display name (optional)',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  displayName?: string;

  @ApiProperty({
    description: 'The user password (optional)',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  password?: string;
}
