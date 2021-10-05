import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateIngredientDto } from 'src/dto/request/createIngredientDto';
import { UpdateIngredientDto } from 'src/dto/request/updateIngredientDto';
import { IngredientService } from 'src/services/ingredient.service';

@Controller('item/')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post(':id/ingredient')
  createIngredient(
    @Param('id') itemId: number,
    @Body() req: CreateIngredientDto,
    @Res() res: Response,
  ) {
    req.itemId = itemId;
    this.ingredientService.createIngredient(req, (resp: any, error: any) => {
      if (error) {
        res.status(500).send(error);
      }
      res.status(200).json(resp);
    });
  }

  @Put(':id/ingredient/:ingredient_id')
  updateIngredient(
    @Param('id') itemId: number,
    @Param('ingredient_id') ingredientId: number,
    @Body() req: UpdateIngredientDto,
    @Res() res: Response,
  ): any {
    req.id = ingredientId;
    this.ingredientService.updateIngredient(req, (resp: any, error: any) => {
      if (error) {
        res.status(500).send(error);
      }
      res.status(200).json(resp);
    });
  }

  @Delete(':id/ingredient/:ingredient_id')
  deleteIngredient(
    @Param('id') itemId: number,
    @Param('ingredient_id') ingredientId: number,
    @Res() res: Response,
  ) {
    this.ingredientService.deleteIngredient(
      ingredientId,
      (resp: any, error: any) => {
        if (error) {
          res.status(500).send(error);
        }
        res.status(200).json(resp);
      },
    );
  }
}
