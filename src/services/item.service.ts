import { Item } from './../models/item.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
  ) {}

  findByCriteria(params: any): Promise<Item[]> {
    let builder = this.itemRepository
      .createQueryBuilder('item')
      .select(['item.id', 'item.image_url', 'item.description'])
      .innerJoin('item.category', 'category')
      .leftJoin('item.foodDet', 'foodDet')
      .where('1=1');

    this.addCriteria(params, builder);

    return builder.getMany();
  }

  private addCriteria(params: any, builder: SelectQueryBuilder<Item>) {

    new Map(Object.entries(params)).forEach((val, key) => {
      if(key === 'category'){
        builder.andWhere('category.id = :category', {category: val})
      }

      if(key === 'serving') {
        builder.andWhere('foodDet.serving = :serving', {serving: val})
      }

      if(key === 'name') {
        builder.andWhere('item.name like :name', {name: `%${val}%`})
      }

      if(key === 'time') {
        builder.andWhere('foodDet.time like :time', {time: `%${val}%`})
      }
    });
  }
}
