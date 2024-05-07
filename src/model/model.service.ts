import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Models } from './entities/model.entity';
import { MarkaService } from 'src/marka/marka.service';

@Injectable()
export class ModelService {
  constructor(
    @InjectModel(Models) private modelRepo: typeof Models,
    private readonly markaService: MarkaService,
  ) {}

  async create(createModelDto: CreateModelDto) {
    const id = createModelDto.markaId;
    const marka = await this.markaService.findOne(id);

    if (!marka) {
      throw new NotFoundException('Not found markaId');
    }

    const newModel = await this.modelRepo.create(createModelDto);

    return { message: 'Create model successfully', model: newModel };
  }

  findAll() {
    return this.modelRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const model = await this.modelRepo.findByPk(id, { include: { all: true } });
    if (!model) {
      throw new NotFoundException('Model not found');
    }
    return model;
  }

  async update(id: number, updateModelDto: UpdateModelDto) {
    const car = await this.modelRepo.findByPk(id);
    if (!car) {
      throw new NotFoundException(`Model with ID ${id} not found`);
    }

    await this.markaService.findOne(updateModelDto.markaId);

    const updateCar = await car.update(updateModelDto);

    return {
      message: `Model with ID ${id} updated successfully`,
      model: updateCar,
    };
  }

  async remove(id: number) {
    const deletedCount = await this.modelRepo.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new NotFoundException(`Marka with id ${id} not found`);
    }
    return { message: `Marka with id ${id} has been successfully deleted` };
  }
}
