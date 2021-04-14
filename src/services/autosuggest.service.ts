import { Item } from './../models/item.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FootDet } from 'src/models/foodDet.model';

@Injectable()
export class AutoSuggestService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(FootDet)
    private foodDetRepository: Repository<FootDet>,
  ) {}

  findAvailableNames(criterio: string): Promise<string[]> {
    return this.itemRepository
      .createQueryBuilder('item')
      .select('item.name')
      .where('item.name like :name', { name: `%${criterio}%` })
      .getMany()
      .then((t) => t.map(item => item.name));
  }

  findAvailableTimes(criterio: string): Promise<string[]> {
    return this.foodDetRepository
      .createQueryBuilder('food')
      .select('food.time')
      .where('food.time like :time', { time: `%${criterio}%` })
      .getMany()
      .then((t) => t.map(food => food.time));
  }

  findAvailableServing(): Promise<number[]> {
    return this.foodDetRepository
      .createQueryBuilder('food')
      .select('food.serving')
      .orderBy('food.serving','ASC')
      .getMany()
      .then((t) => t.map(food => food.serving));
  }
}
