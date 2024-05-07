import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarPriceDto } from './dto/create-car_price.dto';
import { UpdateCarPriceDto } from './dto/update-car_price.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CarPrice } from './entities/car_price.entity';

@Injectable()
export class CarPriceService {
  constructor(@InjectModel(CarPrice) private carPriceRepo: typeof CarPrice) {}

  create(createCarPriceDto: CreateCarPriceDto) {
    return this.carPriceRepo.create(createCarPriceDto);
  }

  findAll() {
    return this.carPriceRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const marka = await this.carPriceRepo.findByPk(id);
    if (!marka) {
      throw new NotFoundException('Car-Price not found');
    }
    return marka;
  }

  async update(id: number, updateCarPriceDto: UpdateCarPriceDto) {
    const [updatedCount, [updatedCarPrice]] = await this.carPriceRepo.update(
      updateCarPriceDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (updatedCount === 0) {
      throw new NotFoundException(`Car-Price with id ${id} not found`);
    }
    return updatedCarPrice;
  }

  async remove(id: number) {
   const deletedCount = await this.carPriceRepo.destroy({ where: { id } });
   if (deletedCount === 0) {
     throw new NotFoundException(`Car-Price with id ${id} not found`);
   }
   return `Car-Price with id ${id} has been successfully deleted`;
  }
}
