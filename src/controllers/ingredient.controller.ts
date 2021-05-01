import { Body, Controller, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { UpdateIngredientDto } from 'src/dto/request/updateIngredientDto';
import { IngredientService } from 'src/services/ingredient.service';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Put()
  updateIngredient(
    @Body() req: UpdateIngredientDto,
    @Res() res: Response,
  ): any {
    this.ingredientService.updateIngredient(req, (resp, error) => {
      if (error) {
        res.status(500).send(error);
      }
      res.status(200).json(resp);
    });
  }
}
