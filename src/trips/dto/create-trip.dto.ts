import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateTripDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  passengerId: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  driverId: number;

  @ApiProperty({ example: 19.432608 })
  @IsNumber()
  start_latitude: number;

  @ApiProperty({ example: -99.133209 })
  @IsNumber()
  start_longitude: number;
}
