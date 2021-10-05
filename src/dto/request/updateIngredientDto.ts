import { IsNotEmpty } from 'class-validator';
export class UpdateIngredientDto {
  
  id: number;

  @IsNotEmpty()
  description: string;
}
