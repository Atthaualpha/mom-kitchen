import { UpdateIngredientDto } from './../dto/request/updateIngredientDto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ingredient } from 'src/models/ingredient.model';

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel(Ingredient)
    private ingredientModel: typeof Ingredient,
  ) {}

  async updateIngredient(body: UpdateIngredientDto, callback: any) {
    try {
      await this.ingredientModel.update(
        {
          description: body.description,
        },
        {
          where: {
            id: body.id,
          },
        },
      );

      callback({ message: 'ok' });
    } catch (error) {
      callback(null, error);
    }
  }
}
