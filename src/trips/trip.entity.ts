import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Driver } from '../drivers/driver.entity';
import { Passenger } from '../passengers/passenger.entity';

@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Driver)
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @ManyToOne(() => Passenger)
  @JoinColumn({ name: 'passenger_id' })
  passenger: Passenger;

  @Column({ type: 'float' })
  start_latitude: number;

  @Column({ type: 'float' })
  start_longitude: number;

  @Column({ type: 'float', nullable: true })
  end_latitude: number;

  @Column({ type: 'float', nullable: true })
  end_longitude: number;

  @Column({ default: true })
  active: boolean;
}
