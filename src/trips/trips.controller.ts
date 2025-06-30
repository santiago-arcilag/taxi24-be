import { Controller, Get, Param } from '@nestjs/common';
import { TripsService } from './trips.service';
import { Trip } from './trip.entity';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  findAll(): Promise<Trip[]> {
    return this.tripsService.findAll();
  }

  @Get('active')
  findActive(): Promise<Trip[]> {
    return this.tripsService.findActive();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Trip | null> {
    return this.tripsService.findById(Number(id));
  }
}
