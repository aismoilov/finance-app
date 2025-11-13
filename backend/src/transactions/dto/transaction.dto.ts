import { IsNumber, IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  amount: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['income', 'expense'])
  type: string;

  @IsNumber()
  categoryId: number;

  @IsDateString()
  @IsOptional()
  date?: string;
}

export class UpdateTransactionDto {
  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @IsDateString()
  @IsOptional()
  date?: string;
}
