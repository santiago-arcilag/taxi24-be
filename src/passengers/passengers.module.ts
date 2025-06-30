import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from './passenger.entity';

import { PassengersService } from './passengers.service';
import { PassengersController } from './passengers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Passenger])],
  controllers: [PassengersController],
  providers: [PassengersService],
})
export class PassengersModule {}
