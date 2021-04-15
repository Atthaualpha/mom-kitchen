import { ItemDto } from './../dto/request/itemDto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
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
  ) {
    this.itemService.saveItem(file, Object.assign(new ItemDto(), JSON.parse(body)));
  }
}
