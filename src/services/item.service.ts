import { Item } from './../models/item.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
  ) {}

  findAllItems(): Promise<Item[]> {
    return this.itemRepository.createQueryBuilder('item').getMany();
  }
}
