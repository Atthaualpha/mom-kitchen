import { IsNotEmpty } from 'class-validator';
export class CreateIngredientDto {
    
  @IsNotEmpty()
  description: string;

  itemId: number;
}
