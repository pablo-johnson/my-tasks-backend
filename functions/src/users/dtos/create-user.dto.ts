import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The user email address',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The user password',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The user display name (optional)',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  displayName?: string;
}
