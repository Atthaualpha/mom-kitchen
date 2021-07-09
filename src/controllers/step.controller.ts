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

@Controller('step')
export class StepController {
  constructor(private readonly stepService: StepService) {}

  @Post()
  createStep(@Body() req: CreateStepDto, @Res() res: Response) {
    this.stepService.createStep(req, (resp: any, error: any) => {
      if (error) {
        res.status(500).send(error);
      }
      res.status(200).json(resp);
    });
  }

  @Put()
  updateStep(@Body() req: UpdateStepDto, @Res() res: Response) {
    this.stepService.updateStep(req, (resp: any, error: any) => {
      if (error) {
        res.status(500).send(error);
      }
      res.status(200).json(resp);
    });
  }

  @Delete(':id')
  deleteStep(@Param('id') stepId: number, @Res() res: Response) {
    this.stepService.deleteStep(stepId, (resp: any, error: any) => {
      if (error) {
        res.status(500).send(error);
      }
      res.status(200).json(resp);
    });
  }
}
