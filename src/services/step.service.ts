import { UpdateStepDto } from './../dto/request/updateStepDto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Step } from 'src/models/step.model';

@Injectable()
export class StepService {
  constructor(
    @InjectModel(Step)
    private stepModel: typeof Step,
  ) {}

  async updateStep(body: UpdateStepDto, callback: any) {
    try {
      await this.stepModel.update(
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

  async deleteStep(stepId: number, callback: any) {
    try {
      await this.stepModel.destroy({
        where: {
          id: stepId,
        },
      });

      callback({ message: 'ok' });
    } catch (error) {
      callback(null, error);
    }
  }
}
