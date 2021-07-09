import { IsNotEmpty } from 'class-validator';
export class CreateIngredientDto {
    
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  itemId: number;
}
