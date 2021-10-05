import { FoodDet } from './../models/foodDet.model';
import { Step } from '../models/step.model';
import { Ingredient } from '../models/ingredient.model';
import { ItemTypeEnum } from './../constants/itemTypeEnum';
import { Category } from '../models/category.model';
import { CreateItemDto } from '../dto/request/createItemDto';
import { join } from 'path';
import { Item } from './../models/item.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { StatusEnum } from '../constants/statusEnum';
import { MedicineDet } from '../models/medicineDet.model';
import { UpdateItemDto } from '../dto/request/updateItemDto';
const fs = require('fs');

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item)
    private itemModel: typeof Item,
    @InjectModel(FoodDet)
    private foodDetModel: typeof FoodDet,
    @InjectModel(MedicineDet)
    private medicineDetModel: typeof MedicineDet,
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

  findItemDetail(itemId: number): Promise<Item> {
    return this.itemModel.findOne({
      attributes: ['id', 'name', 'image_url', 'description', 'item_type'],
      include: [
        {
          attributes: ['id'],
          model: Category,
          required: true,
        },
        {
          attributes: ['id', 'description'],
          model: Ingredient,
        },
        {
          attributes: ['id', 'description'],
          model: Step,
        },
        {
          attributes: ['time', 'serving'],
          model: FoodDet,
        },
        {
          attributes: ['usage'],
          model: MedicineDet,
        },
      ],
      where: {
        id: itemId,
      },
    });
  }

  async saveItem(
    file: Express.Multer.File,
    body: CreateItemDto,
    callback: any,
  ) {
    try {
      const ingredients: any[] = body.ingredients.map((ele) => {
        return { description: ele };
      });
      const steps: any[] = body.steps.map((ele) => {
        return { description: ele };
      });

      let imageUrl = "not-available.jpg"
      if (file != null) {
        imageUrl = this.buildImageUrl(file);
      }

      let itemCreated = await this.itemModel.create(
        {
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

      if (file != null) {
        this.saveImage(imageUrl, file);
      }

      callback(itemCreated);
    } catch (error) {
      callback(null, error);
    }
  }

  async updateItem(body: UpdateItemDto, callback: any) {
    try {
      await this.itemModel.update(
        {
          name: body.name,
          description: body.description,
        },
        {
          where: {
            id: body.id,
          },
        },
      );

      switch (body.itemType) {
        case ItemTypeEnum.Food:
          await this.updateFoodDet(body.id, body);
          break;
        case ItemTypeEnum.Medicine:
          await this.updateMedicineDet(body.id, body);
          break;
      }

      callback({ message: 'ok' });
    } catch (error) {
      callback(null, error);
    }
  }

  private async updateFoodDet(itemId: number, body: UpdateItemDto) {
    await this.foodDetModel.update(
      {
        time: body.time,
        serving: body.serving,
      },
      {
        where: {
          itemId,
        },
      },
    );
  }

  private async updateMedicineDet(itemId: number, body: UpdateItemDto) {
    await this.medicineDetModel.update(
      {
        usage: body.usage,
      },
      {
        where: {
          itemId,
        },
      },
    );
  }

  async deleteItem(itemId: number, callback: any) {
    try {
      await this.itemModel.update(
        { status: StatusEnum.Inactive },
        {
          where: {
            id: itemId,
          },
        },
      );

      callback({ message: 'ok' });
    } catch (error) {
      callback(null, error);
    }
  }

  private buildFilterCriteria(params: any): any {
    let filters: any = {};

    new Map(Object.entries(params)).forEach((val, key) => {
      if (key === 'name') {
        filters.name = { [Op.iLike]: `%${val}%` };
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

  private buildItemDetail(body: CreateItemDto): any {
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
