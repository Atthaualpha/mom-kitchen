import { IsNotEmpty } from 'class-validator';
import { ItemTypeEnum } from './../../constants/itemTypeEnum';
export class UpdateItemDto {

  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  itemType: ItemTypeEnum;

  //food_det
  time: string;
  
  serving: number;

  //medicine_det
  usage: string;
}
