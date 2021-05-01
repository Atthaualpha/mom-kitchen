import { ItemTypeEnum } from '../../constants/itemTypeEnum';

export class CreateItemDto {
  name: string;
  description: string;
  categoryId: number;
  authorId: number;
  ingredients: string[];
  steps: string[];
  itemType: ItemTypeEnum;

  //food_det
  time: string;
  serving: number;

  //medicine_det
  usage: string;
}
