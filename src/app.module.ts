import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { PaymentModule } from './payment/payment.module';
import { Admin } from './admin/entities/admin.entity';
import { Client } from './client/entities/client.entity';
import { MarkaModule } from './marka/marka.module';
import { Marka } from './marka/entities/marka.entity';
import { ModelModule } from './model/model.module';
import { Models } from './model/entities/model.entity';
import { CarPriceModule } from './car_price/car_price.module';
import { CarPrice } from './car_price/entities/car_price.entity';
import { CarsModule } from './cars/cars.module';
import { Car } from './cars/entities/car.entity';
import { CarLocationModule } from './car_location/car_location.module';
import { CarLocation } from './car_location/entities/car_location.entity';
import { CarPhotoModule } from './car_photo/car_photo.module';
import { CarPhoto } from './car_photo/entities/car_photo.entity';
import { StatusModule } from './status/status.module';
import { Status } from './status/entities/status.entity';
import { WeekDayModule } from './week_day/week_day.module';
import { WeekDay } from './week_day/entities/week_day.entity';
import { WorkerModule } from './worker/worker.module';
import { Worker } from './worker/entities/worker.entity';
import { WorkerWorkDayModule } from './worker_work_day/worker_work_day.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Admin,
        Client,
        Marka,
        Models,
        CarPrice,
        Car,
        CarLocation,
        CarPhoto,
        Status,
        WeekDay,
        Worker
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    AdminModule,
    ClientModule,
    PaymentModule,
    MarkaModule,
    ModelModule,
    CarPriceModule,
    CarsModule,
    CarLocationModule,
    CarPhotoModule,
    StatusModule,
    WeekDayModule,
    WorkerModule,
    WorkerWorkDayModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
