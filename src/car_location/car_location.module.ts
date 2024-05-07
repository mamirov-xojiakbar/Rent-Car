import { Module } from '@nestjs/common';
import { CarLocationService } from './car_location.service';
import { CarLocationController } from './car_location.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarLocation } from './entities/car_location.entity';
import { CarsModule } from 'src/cars/cars.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([CarLocation]),
    CarsModule,
    JwtModule.register({}),
  ],
  controllers: [CarLocationController],
  providers: [CarLocationService],
})
export class CarLocationModule {}
