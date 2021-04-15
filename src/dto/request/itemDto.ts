import { ItemTypeEnum } from './../../constants/itemTypeEnum';

export class ItemDto {
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
  use: string;
}
