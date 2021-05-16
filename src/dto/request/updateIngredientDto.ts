import { IsNotEmpty } from 'class-validator';
export class UpdateIngredientDto {
  
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  description: string;
}
