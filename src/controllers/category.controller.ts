import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CategoryDto } from 'src/dto/request/categoryDto';
import { CategoryService } from '../services/category.service';
import { Response } from 'express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(): any {
    return this.categoryService.findAllCategories();
  }

  @Post()
  createCategory(@Body() categoryDto: CategoryDto, @Res() res: Response): any {
    return this.categoryService.createCategory(
      categoryDto,
      (resp: any, error: any) => {
        if (error) {
          return res.status(500).send(error);
        }

        res.status(200).send(resp);
      },
    );
  }
}
