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

  // Additional methods for trip creation/completion can be added here
}
