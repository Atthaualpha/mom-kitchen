import { IsNotEmpty } from 'class-validator';
import { ItemTypeEnum } from '../../constants/itemTypeEnum';

export class CreateItemDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  categoryId: number;

  ingredients: string[];

  steps: string[];

  itemType: ItemTypeEnum;

  //food_det
  time: string;
  serving: number;

  //medicine_det
  usage: string;
}
