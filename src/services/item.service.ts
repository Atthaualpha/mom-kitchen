import { FoodDet } from './../models/foodDet.model';
import { Step } from 'src/models/step.model';
import { Ingredient } from 'src/models/ingredient.model';
import { ItemTypeEnum } from './../constants/itemTypeEnum';
import { Category } from 'src/models/category.model';
import { ItemDto } from './../dto/request/itemDto';
import { join } from 'path';
import { Item } from './../models/item.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { StatusEnum } from 'src/constants/statusEnum';
import { MedicineDet } from 'src/models/medicineDet.model';
const fs = require('fs');

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item)
    private itemModel: typeof Item,
  ) {}

  findByCriteria(params: any): Promise<Item[]> {
    return this.itemModel.findAll({
      attributes: ['id', 'name', 'image_url', 'description'],
      include: [
        {
          attributes: [],
          model: Category,
          required: true,
        },
        { attributes: [], model: FoodDet },
      ],
      where: {
        status: 1,
        ...this.buildFilterCriteria(params),
      },
    });
  }

  private buildFilterCriteria(params: any): any {
    let filters: any = {};

    new Map(Object.entries(params)).forEach((val, key) => {
      if (key === 'name') {
        filters.name = { [Op.like]: `%${val}%` };
      }

      if (key === 'category') {
        filters['$category.id$'] = val;
      }

      if (key === 'serving') {
        filters['$foodDet.serving$'] = val;
      }

      if (key === 'time') {
        filters['$foodDet.time$'] = { [Op.like]: `%${val}%` };
      }
    });

    return filters;
  }

  saveItem(file: Express.Multer.File, body: ItemDto, callback: any) {
    try {
      const ingredients: any[] = body.ingredients.map((ele) => {
        return { description: ele };
      });
      const steps: any[] = body.steps.map((ele) => {
        return { description: ele };
      });

      const imageUrl = this.buildImageUrl(file);

      this.itemModel.create(
        {
          authorId: body.authorId,
          categoryId: body.categoryId,
          name: body.name,
          description: body.description,
          status: StatusEnum.Active,
          itemType: body.itemType,
          imageUrl,
          steps,
          ingredients,
          ...this.buildItemDetail(body),
        },
        {
          include: [Ingredient, Step, FoodDet, MedicineDet],
        },
      );

      this.saveImage(imageUrl, file);

      callback({ message: 'ok' });
    } catch (error) {
      callback(error);
    }
  }

  private buildItemDetail(body: ItemDto): any {
    let itemDetail: any = {};
    switch (body.itemType) {
      case ItemTypeEnum.Food:
        itemDetail = { foodDet: { time: body.time, serving: body.serving } };
        break;

      case ItemTypeEnum.Medicine:
        itemDetail = { medicineDet: { usage: body.usage } };
        break;
    }
    return itemDetail;
  }

  private buildImageUrl(file: Express.Multer.File): string {
    return (
      new Date().getTime() +
      file.originalname.substring(file.originalname.indexOf('.'))
    );
  }

  private saveImage(imageName: string, file: Express.Multer.File) {
    let path = join(__dirname, '..', 'public/img');
    fs.writeFileSync(`${path}/${imageName}`, file.buffer);
  }
}
