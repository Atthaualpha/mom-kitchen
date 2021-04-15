import { Category } from 'src/models/category.model';
import { Step } from 'src/models/step.model';
import { Ingredient } from 'src/models/ingredient.model';
import { Author } from 'src/models/author.model';
import { ItemDto } from './../dto/request/itemDto';
import { join } from 'path';
import { Item } from './../models/item.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
const fs = require('fs');

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(Ingredient) private ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Step) private stepRepository: Repository<Step>,
    @InjectRepository(Step) private Repository: Repository<Step>,
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
      if (key === 'category') {
        builder.andWhere('category.id = :category', { category: val });
      }

      if (key === 'serving') {
        builder.andWhere('foodDet.serving = :serving', { serving: val });
      }

      if (key === 'name') {
        builder.andWhere('item.name like :name', { name: `%${val}%` });
      }

      if (key === 'time') {
        builder.andWhere('foodDet.time like :time', { time: `%${val}%` });
      }
    });
  }

  saveItem(file: Express.Multer.File, body: ItemDto) {
   
    const author = new Author();
    author.id = body.authorId;

    const category = new Category();
    category.id = body.categoryId;

    const item = new Item();
    item.author = author;
    item.category = category;
    item.name = body.name;
    item.description = body.description;
    item.imageUrl = new Date().getTime() + file.originalname.substring(file.originalname.indexOf('.'));
    console.log(item)
    this.itemRepository.save(item);

    this.saveImage(item.imageUrl,file)

  }

  private saveImage(imageName: string, file: Express.Multer.File) {
    let path = join(__dirname, '..', 'public/img');
    fs.writeFileSync(`${path}/${imageName}`, file.buffer);
  }
}
