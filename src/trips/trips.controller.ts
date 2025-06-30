import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { TripsService } from './trips.service';
import { Trip } from './trip.entity';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  async createTrip(@Body() body: { passengerId: number; driverId: number; start_latitude: number; start_longitude: number }) {
    return this.tripsService.createTrip(body.passengerId, body.driverId, body.start_latitude, body.start_longitude);
  }

  @Patch(':id/complete')
  async completeTrip(
    @Param('id') id: number,
    @Body() body: { end_latitude: number; end_longitude: number }
  ) {
    return this.tripsService.completeTrip(Number(id), body.end_latitude, body.end_longitude);
  }

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
