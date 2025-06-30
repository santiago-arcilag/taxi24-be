import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './trip.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
  ) {}

  findAll(): Promise<Trip[]> {
    return this.tripRepository.find({ relations: ['driver', 'passenger'] });
  }

  findActive(): Promise<Trip[]> {
    return this.tripRepository.find({ where: { active: true }, relations: ['driver', 'passenger'] });
  }

  findById(id: number): Promise<Trip | null> {
    return this.tripRepository.findOne({ where: { id }, relations: ['driver', 'passenger'] });
  }

  async createTrip(passengerId: number, driverId: number, start_latitude: number, start_longitude: number): Promise<Trip> {
    const trip = this.tripRepository.create({
      passenger: { id: passengerId },
      driver: { id: driverId },
      start_latitude,
      start_longitude,
      active: true,
    });
    return this.tripRepository.save(trip);
  }

  async completeTrip(tripId: number, end_latitude: number, end_longitude: number): Promise<Trip | null> {
    const trip = await this.tripRepository.findOne({ where: { id: tripId }, relations: ['driver', 'passenger'] });
    if (!trip) return null;
    trip.end_latitude = end_latitude;
    trip.end_longitude = end_longitude;
    trip.active = false;
    return this.tripRepository.save(trip);
  }
}
