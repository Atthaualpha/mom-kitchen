import { UpdateIngredientDto } from './../dto/request/updateIngredientDto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ingredient } from 'src/models/ingredient.model';
import { CreateIngredientDto } from 'src/dto/request/createIngredientDto';

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel(Ingredient)
    private ingredientModel: typeof Ingredient,
  ) {}

  async createIngredient(body: CreateIngredientDto, callback: any) {
    try {
      await this.ingredientModel.create({
        description: body.description,
        itemId: body.itemId,
      });

      callback({ message: 'ok' });
    } catch (error) {
      callback(null, error);
    }
  }

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

  async deleteIngredient(ingredientId: number, callback: any) {
    try {
      await this.ingredientModel.destroy({
        where: {
          id: ingredientId
        }
      })

      callback({message: 'ok'})
    }catch(error) {
      callback(null, error)
    }
  }
}
