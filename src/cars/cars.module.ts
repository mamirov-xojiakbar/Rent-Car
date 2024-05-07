import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './entities/car.entity';
import { ModelModule } from 'src/model/model.module';
import { CarPriceModule } from 'src/car_price/car_price.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Car]),
    ModelModule,
    CarPriceModule,
    JwtModule.register({}),
  ],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}
