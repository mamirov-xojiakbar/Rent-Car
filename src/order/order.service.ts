import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { ClientService } from 'src/client/client.service';
import { CarsService } from 'src/cars/cars.service';
import { StatusService } from 'src/status/status.service';
import { WorkerService } from 'src/worker/worker.service';
import { log } from 'console';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private readonly orderRepo: typeof Order,
    private readonly clientService: ClientService,
    private readonly carService: CarsService,
    private readonly statusService: StatusService,
    private readonly workerService: WorkerService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    await this.clientService.findOne(createOrderDto.clientId);   
    await this.carService.findOne(createOrderDto.carId);
    await this.statusService.findOne(createOrderDto.statusId);
    await this.workerService.findOne(createOrderDto.workerId);

    const newCar = await this.orderRepo.create(createOrderDto);

    return { message: 'Create new car successfully', car: newCar };
  }


  findAll() {
    return this.orderRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const car = await this.orderRepo.findByPk(id, { include: { all: true } });
    if (!car) {
      throw new NotFoundException('Order not found');
    }
    return car;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const car = await this.orderRepo.findByPk(id);
    if (!car) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    await this.clientService.findOne(updateOrderDto.clientId);
    await this.carService.findOne(updateOrderDto.carId);
    await this.statusService.findOne(updateOrderDto.statusId);
    await this.workerService.findOne(updateOrderDto.workerId);

    const updateCar = await car.update(updateOrderDto);

    return {
      message: `Order with ID ${id} updated successfully`,
      order: updateCar,
    };
  }

  async remove(id: number) {
    const deletedRowsCount = await this.orderRepo.destroy({ where: { id } });

    if (deletedRowsCount === 0) {
      throw new NotFoundException('Order not found');
    }

    return { message: `Order with ID ${id} has been successfully deleted` };
  }
}
