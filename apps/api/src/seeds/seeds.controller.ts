import { Controller, Get } from '@nestjs/common';
import { SeedsService } from './seeds.service';


@Controller('seeds')
export class SeedsController {
  constructor(private readonly seedsService: SeedsService) { }

  @Get()
  executeSeed() {
    return this.seedsService.executeSeed();
  }
}
