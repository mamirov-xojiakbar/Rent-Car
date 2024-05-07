import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarPhotoDto } from './dto/create-car_photo.dto';
import { UpdateCarPhotoDto } from './dto/update-car_photo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CarPhoto } from './entities/car_photo.entity';
import { CarsService } from 'src/cars/cars.service';

@Injectable()
export class CarPhotoService {
  constructor(
    @InjectModel(CarPhoto)
    private readonly carPhotoRepo: typeof CarPhoto,
    private readonly carService: CarsService,
  ) {}

  async create(createCarPhotoDto: CreateCarPhotoDto) {
    await this.carService.findOne(createCarPhotoDto.carId);

    const newCar = await this.carPhotoRepo.create(createCarPhotoDto);

    return {
      message: 'Create new carPhoto successfully',
      carLocation: newCar,
    };
  }

  findAll() {
    return this.carPhotoRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const car = await this.carPhotoRepo.findByPk(id, {
      include: { all: true },
    });
    if (!car) {
      throw new NotFoundException('carPhoto not found');
    }
    return car;
  }

  async update(id: number, updateCarPhotoDto: UpdateCarPhotoDto) {
    const car = await this.carPhotoRepo.findByPk(id);
    if (!car) {
      throw new NotFoundException(`Car-Photo with ID ${id} not found`);
    }

    await this.carService.findOne(updateCarPhotoDto.carId);

    const updateCar = await car.update(updateCarPhotoDto);

    return {
      message: `Car-Photo with ID ${id} updated successfully`,
      carPhoto: updateCar,
    };
  }

  async remove(id: number) {
    const rowsAffected = await this.carPhotoRepo.destroy({ where: { id } });
    if (rowsAffected === 0) {
      throw new NotFoundException('Car-Photo not found');
    }
    return { message: 'Deleted Car-Photo' };
  }
}
