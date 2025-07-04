import { Controller, Get, Param, Query, BadRequestException, ParseFloatPipe } from '@nestjs/common';
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
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('lng', ParseFloatPipe) lng: number,
    @Query('radiusKm') radiusKm?: string,
  ): Promise<Driver[]> {
    if (lat === undefined || lng === undefined || isNaN(lat) || isNaN(lng)) {
      throw new BadRequestException('lat and lng query parameters are required and must be valid numbers.');
    }
    let radius = 3;
    if (radiusKm !== undefined) {
      const parsedRadius = parseFloat(radiusKm);
      if (!isNaN(parsedRadius) && parsedRadius > 0) {
        radius = parsedRadius;
      }
    }
    return this.driversService.findAvailableWithinRadius(lat, lng, radius);
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Driver | null> {
    return this.driversService.findById(Number(id));
  }
}
