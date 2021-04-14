import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ItemService } from '../services/item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  findByCriteria(@Req() req : Request): any {    
    return this.itemService.findByCriteria(req.query);
  }
}
