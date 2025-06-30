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

  // Additional methods for geo queries and CRUD can be added here
}
