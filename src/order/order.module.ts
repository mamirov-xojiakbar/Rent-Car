import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { ClientService } from 'src/client/client.service';
import { CarsService } from 'src/cars/cars.service';
import { StatusService } from 'src/status/status.service';
import { WorkerService } from 'src/worker/worker.service';
import { ClientModule } from 'src/client/client.module';
import { CarsModule } from 'src/cars/cars.module';
import { StatusModule } from 'src/status/status.module';
import { WorkerModule } from 'src/worker/worker.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Order]),
    ClientModule,
    CarsModule,
    StatusModule,
    WorkerModule,
    JwtModule.register({}),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
