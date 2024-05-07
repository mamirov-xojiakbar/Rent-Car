import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarLocationDto } from './dto/create-car_location.dto';
import { UpdateCarLocationDto } from './dto/update-car_location.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CarLocation } from './entities/car_location.entity';
import { CarsService } from 'src/cars/cars.service';

@Injectable()
export class CarLocationService {
  constructor(
    @InjectModel(CarLocation) private readonly carLocationRepo: typeof CarLocation,
    private readonly carService: CarsService,
  ) {}

  async create(createCarLocationDto: CreateCarLocationDto) {
    await this.carService.findOne(createCarLocationDto.carId);

    const newCar = await this.carLocationRepo.create(createCarLocationDto);

    return { message: 'Create new carLocation successfully', carLocation: newCar };
  }

  findAll() {
    return this.carLocationRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const car = await this.carLocationRepo.findByPk(id, { include: { all: true } });
    if (!car) {
      throw new NotFoundException('carLocation not found');
    }
    return car;
  }

  async update(id: number, updateCarLocationDto: UpdateCarLocationDto) {
    const car = await this.carLocationRepo.findByPk(id);
    if (!car) {
      throw new NotFoundException(`Car-Location with ID ${id} not found`);
    }

    await this.carService.findOne(updateCarLocationDto.carId);

    const updateCar = await car.update(updateCarLocationDto);

    return {
      message: `Car-Location with ID ${id} updated successfully`,
      carLocation: updateCar,
    };
  }

  async remove(id: number) {
    const rowsAffected = await this.carLocationRepo.destroy({ where: { id } });
    if (rowsAffected === 0) {
      throw new NotFoundException('Car-Location not found');
    }
    return { message: 'Deleted Car-Location' };
  }
}
