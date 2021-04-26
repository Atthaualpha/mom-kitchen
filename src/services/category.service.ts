import { Category } from './../models/category.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category
  ) {}

  async findAllCategories(): Promise<Category[]> {
    return this.categoryModel.findAll();
  }

}
