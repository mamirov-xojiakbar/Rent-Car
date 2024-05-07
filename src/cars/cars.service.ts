import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Car } from './entities/car.entity';
import { ModelService } from 'src/model/model.service';
import { CarPriceService } from 'src/car_price/car_price.service';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car) private readonly carRepo: typeof Car,
    private readonly modelService: ModelService,
    private readonly carPriceService: CarPriceService,
  ) {}

  async create(createCarDto: CreateCarDto) {
    await this.modelService.findOne(createCarDto.modelId);
    await this.carPriceService.findOne(createCarDto.priceId);

    const newCar = await this.carRepo.create(createCarDto);

    return { message: 'Create new car successfully', car: newCar };
  }

  findAll() {
    return this.carRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const car = await this.carRepo.findByPk(id, { include: { all: true } });
    if (!car) {
      throw new NotFoundException('car not found');
    }
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const car = await this.carRepo.findByPk(id);
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }

    await this.modelService.findOne(updateCarDto.modelId);
    await this.carPriceService.findOne(updateCarDto.priceId);

    const updateCar = await car.update(updateCarDto);

    return {
      message: `Car with ID ${id} updated successfully`,
      car: updateCar,
    };
  }

  async remove(id: number) {
    const rowsAffected = await this.carRepo.destroy({ where: { id } });
    if (rowsAffected === 0) {
      throw new NotFoundException('Car not found');
    }
    return { message: 'Deleted Car' };
  }
}
