import { Body, Controller, Post } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';

@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) { }

  @Post('/process')
  updateProcess(@Body() processDTO) {
    return this.monitoringService.handleInsertComment(processDTO)
  }
}
