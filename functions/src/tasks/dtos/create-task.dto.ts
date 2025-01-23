import { IsString, IsOptional, IsArray, IsDateString, IsEnum } from 'class-validator';

export enum TaskFrequency {
  ONCE = 'once',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  TWO_PER_WEEK = 'two_per_week',
  BIWEEKLY = 'biweekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  SEMIANNUALLY = 'semiannually',
  ANNUALLY = 'annually',
}

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  responsible: string[];

  @IsDateString()
  date: string;

  @IsEnum(TaskFrequency)
  frequency: TaskFrequency;

  @IsString()
  projectId: string;
}
