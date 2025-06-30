import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  findAll(): Promise<Driver[]> {
    return this.driverRepository.find();
  }

  findAvailable(): Promise<Driver[]> {
    return this.driverRepository.find({ where: { available: true } });
  }

  findById(id: number): Promise<Driver | null> {
    return this.driverRepository.findOneBy({ id });
  }

  // Find available drivers within a 3km radius of a given location
  async findAvailableWithinRadius(lat: number, lng: number, radiusKm = 3): Promise<Driver[]> {
    return this.driverRepository.query(
      `SELECT *, (
        6371 * acos(
          cos(radians($1)) * cos(radians(latitude)) *
          cos(radians(longitude) - radians($2)) +
          sin(radians($1)) * sin(radians(latitude))
        )
      ) AS distance
      FROM drivers
      WHERE available = true
      AND (
        6371 * acos(
          cos(radians($1)) * cos(radians(latitude)) *
          cos(radians(longitude) - radians($2)) +
          sin(radians($1)) * sin(radians(latitude))
        )
      ) <= $3
      ORDER BY distance ASC`,
      [lat, lng, radiusKm]
    );
  }
}
