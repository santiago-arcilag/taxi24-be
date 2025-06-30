import { Controller, Get, Param } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { Passenger } from './passenger.entity';

@Controller('passengers')
export class PassengersController {
  constructor(private readonly passengersService: PassengersService) {}

  @Get()
  findAll(): Promise<Passenger[]> {
    return this.passengersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Passenger | null> {
    return this.passengersService.findById(Number(id));
  }
}
