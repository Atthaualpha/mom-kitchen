import { UpdateStepDto } from './../dto/request/updateStepDto';
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { StepService } from 'src/services/step.service';
import { Response } from 'express';
import { CreateStepDto } from 'src/dto/request/createStepDto';

@Controller('item')
export class StepController {
  constructor(private readonly stepService: StepService) {}

  @Post(':id/step')
  createStep(@Param('id') itemId: number, @Body() req: CreateStepDto, @Res() res: Response) {
    req.itemId = itemId
    this.stepService.createStep(req, (resp: any, error: any) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(200).json(resp);
    });
  }

  @Put(':id/step/:step_id')
  updateStep(@Param('id') itemId: number,@Param('step_id') stepId: number, @Body() req: UpdateStepDto, @Res() res: Response) {
    req.id = stepId
    this.stepService.updateStep(req, (resp: any, error: any) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(200).json(resp);
    });
  }

  @Delete(':id/step/:step_id')
  deleteStep(@Param('id') itemId: number,@Param('step_id') stepId: number, @Res() res: Response) {
    this.stepService.deleteStep(stepId, (resp: any, error: any) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(200).json(resp);
    });
  }
}
