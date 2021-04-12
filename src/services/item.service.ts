import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemService {
  getHello(): any {
    return {
      message: 'hello world!'
    };
  }
}