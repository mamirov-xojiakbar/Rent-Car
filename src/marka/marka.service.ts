import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarkaDto } from './dto/create-marka.dto';
import { UpdateMarkaDto } from './dto/update-marka.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Marka } from './entities/marka.entity';

@Injectable()
export class MarkaService {
  constructor(@InjectModel(Marka) private markaRepo: typeof Marka) {}

  create(createMarkaDto: CreateMarkaDto) {
    return this.markaRepo.create(createMarkaDto);
  }

  findAll() {
    return this.markaRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const marka = await this.markaRepo.findByPk(id);
    if (!marka) {
      throw new NotFoundException('Marka not found');
    }
    return marka;
  }

  async update(id: number, updateMarkaDto: UpdateMarkaDto) {
    const [updatedCount, [updatedMarka]] = await this.markaRepo.update(
      updateMarkaDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (updatedCount === 0) {
      throw new NotFoundException(`Marka with id ${id} not found`);
    }
    return updatedMarka;
  }

  async remove(id: number) {
    const deletedCount = await this.markaRepo.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new NotFoundException(`Marka with id ${id} not found`);
    }
    return `Marka with id ${id} has been successfully deleted`;
  }
}
