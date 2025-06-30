import { Controller, Get, Param, Query } from '@nestjs/common';
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

  @Get('available/nearby')
  findAvailableNearby(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
    @Query('radiusKm') radiusKm?: string,
  ): Promise<Driver[]> {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const radius = radiusKm ? parseFloat(radiusKm) : 3;
    return this.driversService.findAvailableWithinRadius(latitude, longitude, radius);
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Driver | null> {
    return this.driversService.findById(Number(id));
  }
}
