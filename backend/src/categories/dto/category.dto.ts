import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['income', 'expense'])
  type: string;
}

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name?: string;
}
