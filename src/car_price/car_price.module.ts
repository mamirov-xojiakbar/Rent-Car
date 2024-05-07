import { Module } from '@nestjs/common';
import { CarPriceService } from './car_price.service';
import { CarPriceController } from './car_price.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarPrice } from './entities/car_price.entity';

@Module({
  imports: [SequelizeModule.forFeature([CarPrice])],
  controllers: [CarPriceController],
  providers: [CarPriceService],
  exports: [CarPriceService],
})
export class CarPriceModule {}
