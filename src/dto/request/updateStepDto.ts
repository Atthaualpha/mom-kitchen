import { IsNotEmpty } from 'class-validator';
export class UpdateStepDto {

  id: number;

  @IsNotEmpty()
  description: string;
}
