import { Controller, Get, Param } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { Driver } from './driver.entity';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  findAll(): Promise<Driver[]> {
    return this.driversService.findAll();
  }

  @Get('available')
  findAvailable(): Promise<Driver[]> {
    return this.driversService.findAvailable();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Driver | null> {
    return this.driversService.findById(Number(id));
  }
}
