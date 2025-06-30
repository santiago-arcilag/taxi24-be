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

  // Additional methods for advanced queries can be added here
}
