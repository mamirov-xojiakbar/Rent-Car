import { Module } from '@nestjs/common';
import { CarPhotoService } from './car_photo.service';
import { CarPhotoController } from './car_photo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarPhoto } from './entities/car_photo.entity';
import { CarsModule } from 'src/cars/cars.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([CarPhoto]),
    CarsModule,
  ],
  controllers: [CarPhotoController],
  providers: [CarPhotoService],
})
export class CarPhotoModule {}
