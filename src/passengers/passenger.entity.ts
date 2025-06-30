import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('passengers')
export class Passenger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'float', nullable: true })
  latitude: number;

  @Column({ type: 'float', nullable: true })
  longitude: number;
}
