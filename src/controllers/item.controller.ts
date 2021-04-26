import { ItemDto } from './../dto/request/itemDto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { ItemService } from '../services/item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  findByCriteria(@Req() req: Request): any {
    return this.itemService.findByCriteria(req.query);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('request') body: any,
    @Res() res: Response,
  ) {
    this.itemService.saveItem(
      file,
      Object.assign(new ItemDto(), JSON.parse(body)),
      (resp, error) => {
        if (error) {
          res.status(500).send(error);
        }
        res.status(200).json(resp);
      },
    );
  }

  @Delete(':id')
  deleteItem(@Param('id') itemId: number, @Res() res: Response) {
    this.itemService.deleteItem(itemId, (resp, error) => {
      if (error) {
        res.status(500).send(error);
      }
      res.status(200).json(resp);
    });
  }
}
