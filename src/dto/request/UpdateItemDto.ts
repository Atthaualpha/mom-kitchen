import { ItemTypeEnum } from './../../constants/itemTypeEnum';
export class UpdateItemDto {
  id: number;

  name: string;

  description: string;

  itemType: ItemTypeEnum;

  //food_det
  time: string;
  
  serving: number;

  //medicine_det
  usage: string;
}
