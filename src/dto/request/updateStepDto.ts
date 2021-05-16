import { IsNotEmpty } from 'class-validator';
export class UpdateStepDto {

  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  description: string;
}
