import { Category } from 'src/models/category.model';
import { Step } from 'src/models/step.model';
import { Ingredient } from 'src/models/ingredient.model';
import { Author } from 'src/models/author.model';
import { ItemDto } from './../dto/request/itemDto';
import { join } from 'path';
import { Item } from './../models/item.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { FootDet } from 'src/models/foodDet.model';
const fs = require('fs');

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item)
    private itemModel: typeof Item /* @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Step) private stepRepository: Repository<Step>,
    @InjectRepository(Step) private Repository: Repository<Step>,*/,
  ) {}

  findByCriteria(params: any): Promise<Item[]> {
    const filters = this.buildFilterCriteria(params);

    return this.itemModel.findAll({
      attributes: ['id', 'image_url', 'description'],
      include: [
        {
          attributes: [],
          model: Category,
          required: true,
          where: filters.category
        },
        {
          model: FootDet
        },
      ],
    });
  }

  private buildFilterCriteria(params: any): any {
    let filters: any = { category: {}, foodDet: {} };

    new Map(Object.entries(params)).forEach((val, key) => {
      if (key === 'category') {
        filters.category.id =  val;
      }

      if (key === 'serving') {
        filters.foodDet.serving = { [Op.and]: val };
      }

      if (key === 'name') {
        filters.foodDet.name = { [Op.like]: `%${val}%` };
      }

      if (key === 'time') {
        filters.foodDet.time = { [Op.like]: `%${val}%` };
      }
    });

    return filters;
  }
  /*
  saveItem(file: Express.Multer.File, body: ItemDto) {
    const author = new Author();
    author.id = body.authorId;

    const category = new Category();
    category.id = body.categoryId;

    const ingredients: Ingredient[] = body.ingredients.map(
      (ele) => this.ingredientRepository.create({description: ele})
    );
    const steps: Step[] = body.steps.map((ele) => new Step(ele));

    const item = this.itemRepository.create({
      author,
      category,
      name: body.name,
      description: body.description,      
      imageUrl:
        new Date().getTime() +
        file.originalname.substring(file.originalname.indexOf('.')),
      ingredients      
    });

    /*
    item.author = author;
    item.category = category;
    item.name = body.name;
    item.description = body.description;
    item.imageUrl =
      new Date().getTime() +
      file.originalname.substring(file.originalname.indexOf('.'));
    item.ingredients = ingredients;
    item.steps = steps;

    console.log(item);
    this.itemRepository.save(item);

    this.saveImage(item.imageUrl, file);
  }
*/
  private saveImage(imageName: string, file: Express.Multer.File) {
    let path = join(__dirname, '..', 'public/img');
    fs.writeFileSync(`${path}/${imageName}`, file.buffer);
  }
}
