import { Controller, Get, Post, Patch, Body, Param, ValidationPipe, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripsService } from './trips.service';
import { Trip } from './trip.entity';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  async createTrip(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) dto: CreateTripDto) {
    return this.tripsService.createTrip(dto.passengerId, dto.driverId, dto.start_latitude, dto.start_longitude);
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
  async findById(@Param('id') id: number) {
    const trip = await this.tripsService.findById(Number(id));
    if (!trip) throw new NotFoundException('Trip not found');
    return trip;
  }
}
