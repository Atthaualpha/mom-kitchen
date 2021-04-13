import { Controller, Get } from '@nestjs/common';
import { ItemService } from '../services/item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  findAll(): any {
    return this.itemService.findAllItems();
  }
}
