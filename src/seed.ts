import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConnection } from 'typeorm';
import { Driver } from './drivers/driver.entity';
import { Passenger } from './passengers/passenger.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const connection = getConnection();

  // Seed Drivers
  const drivers = [
    { name: 'Alice', latitude: 19.432608, longitude: -99.133209, available: true },
    { name: 'Bob', latitude: 19.427025, longitude: -99.167665, available: true },
    { name: 'Carlos', latitude: 19.426726, longitude: -99.171870, available: false },
  ];
  await connection.getRepository(Driver).save(drivers);

  // Seed Passengers
  const passengers = [
    { name: 'Eve', latitude: 19.430000, longitude: -99.140000 },
    { name: 'Mallory', latitude: 19.428000, longitude: -99.150000 },
  ];
  await connection.getRepository(Passenger).save(passengers);

  await app.close();
  console.log('Seed data inserted!');
}

bootstrap();
