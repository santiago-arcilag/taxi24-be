import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passenger } from './passenger.entity';

@Injectable()
export class PassengersService {
  constructor(
    @InjectRepository(Passenger)
    private readonly passengerRepository: Repository<Passenger>,
  ) {}

  findAll(): Promise<Passenger[]> {
    return this.passengerRepository.find();
  }

  findById(id: number): Promise<Passenger | null> {
    return this.passengerRepository.findOneBy({ id });
  }

  // Find the 3 closest available drivers to a passenger's location
  async findClosestDrivers(passengerId: number): Promise<any[]> {
    const passenger = await this.passengerRepository.findOneBy({ id: passengerId });
    if (!passenger) return [];
    return this.passengerRepository.query(
      `SELECT *, (
        6371 * acos(
          cos(radians($1)) * cos(radians(latitude)) *
          cos(radians(longitude) - radians($2)) +
          sin(radians($1)) * sin(radians(latitude))
        )
      ) AS distance
      FROM drivers
      WHERE available = true
      ORDER BY distance ASC
      LIMIT 3`,
      [passenger.latitude, passenger.longitude]
    );
  }
}
