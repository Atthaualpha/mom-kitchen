import { Item } from './../models/item.model';
import { Injectable } from '@nestjs/common';
import { FootDet } from 'src/models/foodDet.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

@Injectable()
export class AutoSuggestService {
  constructor(
    @InjectModel(Item) private itemModel: typeof Item,
    @InjectModel(FootDet) private foodDetModel: typeof FootDet,
  ) {}

  findAvailableNames(criterio: string): Promise<string[]> {
    return this.itemModel
      .findAll({
        attributes: ['name'],
        where: { name: { [Op.like]: `%${criterio}%` } },
      })
      .then((e) => e.map((item) => item.name));
  }

  findAvailableTimes(criterio: string): Promise<string[]> {
    return this.foodDetModel
      .findAll({
        attributes: ['time'],
        where: { time: { [Op.like]: `%${criterio}%` } },
      })
      .then((e) => e.map((food) => food.time));
  }

  findAvailableServing(): Promise<number[]> {
    return this.foodDetModel
      .findAll({
        attributes: ['serving'],
        order: [['serving', 'ASC']],
      })
      .then((e) => e.map((food) => food.serving));
  }
}
