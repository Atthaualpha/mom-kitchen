import { ItemTypeEnum } from './../constants/itemTypeEnum';
import { CreateItemDto } from '../dto/request/createItemDto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { ItemService } from '../services/item.service';
import { UpdateItemDto } from 'src/dto/request/updateItemDto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('all')
  findByCriteria(@Req() req: Request): any {
    return this.itemService.findByCriteria(req.query);
  }

  @Get(':id')
  findItemDetail(@Param('id') itemId: number, @Res() res: Response) {
    this.itemService.findItemDetail(itemId, (resp: any, error: any) => {
      if (error) {
        return res.status(500).send(error);
      }
      if(!resp) {
        return res.status(404).send({
          message: "Item not found"
        });
      }
      res.status(200).json(resp);
    });
  }

  @Post()
  saveItem(@Body() body: CreateItemDto, @Res() res: Response) {
    body.itemType = ItemTypeEnum.Food;
    this.itemService.saveItem(null, body, (resp: any, error: any) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(200).json(resp);
    });
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  saveItemWithImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('request') body: any,
    @Res() res: Response,
  ) {
    this.itemService.saveItem(
      file,
      Object.assign(new CreateItemDto(), JSON.parse(body)),
      (resp: any, error: any) => {
        if (error) {
          return res.status(500).send(error);
        }
        res.status(200).json(resp);
      },
    );
  }

  @Put(':id')
  updateItem(
    @Param('id') itemId: number,
    @Body() req: UpdateItemDto,
    @Res() res: Response,
  ) {
    req.id = itemId;
    req.itemType = ItemTypeEnum.Food;
    this.itemService.updateItem(req, (resp: any, error: any) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(200).json(resp);
    });
  }

  @Delete(':id')
  deleteItem(@Param('id') itemId: number, @Res() res: Response) {
    this.itemService.deleteItem(itemId, (resp: any, error: any) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(200).json(resp);
    });
  }
}
