import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment) private paymentRepo: typeof Payment,
    private readonly orderService: OrderService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const id = createPaymentDto.orderId;
    const marka = await this.orderService.findOne(id);

    if (!marka) {
      throw new NotFoundException('Not found orderId');
    }

    const newModel = await this.paymentRepo.create(createPaymentDto);

    return { message: 'Create Payment successfully', payment: newModel };
  }

  findAll() {
    return this.paymentRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const model = await this.paymentRepo.findByPk(id, {
      include: { all: true },
    });
    if (!model) {
      throw new NotFoundException('Payment not found');
    }
    return model;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const car = await this.paymentRepo.findByPk(id);
    if (!car) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    await this.orderService.findOne(updatePaymentDto.orderId);

    const updateCar = await car.update(updatePaymentDto);

    return {
      message: `Payment with ID ${id} updated successfully`,
      payment: updateCar,
    };
  }

  async remove(id: number) {
    const deletedCount = await this.paymentRepo.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }
    return { message: `Payment with id ${id} has been successfully deleted` };
  }
}
