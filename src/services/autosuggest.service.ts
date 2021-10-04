import { Item } from './../models/item.model';
import { Injectable } from '@nestjs/common';
import { FoodDet } from 'src/models/foodDet.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

@Injectable()
export class AutoSuggestService {
  constructor(
    @InjectModel(Item) private itemModel: typeof Item,
    @InjectModel(FoodDet) private foodDetModel: typeof FoodDet,
  ) {}

  findAvailableNames(criterio: string): Promise<string[]> {
    return this.itemModel
      .findAll({
        attributes: ['name'],
        where: { status: 1, name: { [Op.iLike]: `%${criterio}%` } },
        group: 'name',
      })
      .then((e) => e.map((item) => item.name));
  }

  findAvailableTimes(criterio: string): Promise<string[]> {
    return this.foodDetModel
      .findAll({
        attributes: ['time'],
        include: [
          {
            attributes: [],
            model: Item
          }
        ],
        where: { time: { [Op.like]: `%${criterio}%` }, "$item.status$": 1 },
        group: 'time',
      })
      .then((e) => e.map((food) => food.time));
  }

  findAvailableServing(): Promise<number[]> {
    return this.foodDetModel
      .findAll({
        attributes: ['serving'],
        include: [
          {
            attributes: [],
            model: Item
          }
        ],
        where: {
          "$item.status$": 1
        },
        order: [['serving', 'ASC']],
        group: 'serving',
      })
      .then((e) => e.map((food) => food.serving));
  }
}
