import { AutoSuggestService } from './../services/autosuggest.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('autosuggest')
export class AutoSuggestController {
  constructor(private readonly autoSuggestService: AutoSuggestService) {}

  @Get('/item')
  findAvailableName(@Query('q') q: string) {
    return this.autoSuggestService.findAvailableNames(q);
  }

  @Get('/time')
  findAvailableTime(@Query('q') q: string) {
    return this.autoSuggestService.findAvailableTimes(q);
  }

  @Get('/serving')
  findAvailableServing() {
    return this.autoSuggestService.findAvailableServing();
  }
}
