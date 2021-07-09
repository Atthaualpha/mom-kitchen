import { IsNotEmpty } from 'class-validator';
export class CreateStepDto {
    
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  itemId: number;
}
