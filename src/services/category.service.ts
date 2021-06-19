import { Category } from './../models/category.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryDto } from 'src/dto/request/categoryDto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category
  ) {}

  async findAllCategories(): Promise<Category[]> {
    return this.categoryModel.findAll();
  }

  async createAuthor(categoryDto: CategoryDto, callback: any) {
    try {
      await this.categoryModel.create(categoryDto)
      callback({ message : 'ok'})   
    } catch (error) {
      callback(null, error)   
    }
    
  }

}
