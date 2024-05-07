import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService {
  constructor(@InjectModel(Status) private statusRepo: typeof Status) {}

  create(createStatusDto: CreateStatusDto) {
    return this.statusRepo.create(createStatusDto);
  }

  findAll() {
    return this.statusRepo.findAll();
  }

  async findOne(id: number) {
    const marka = await this.statusRepo.findByPk(id);
    if (!marka) {
      throw new NotFoundException('Status not found');
    }
    return marka;
  }

  async update(id: number, updateStatusDto: UpdateStatusDto) {
    const [updatedCount, [updatedMarka]] = await this.statusRepo.update(
      updateStatusDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (updatedCount === 0) {
      throw new NotFoundException(`Status with id ${id} not found`);
    }
    return updatedMarka;
  }

  async remove(id: number) {
    const deletedCount = await this.statusRepo.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new NotFoundException(`Status with id ${id} not found`);
    }
    return `Status with id ${id} has been successfully deleted`;
  }
}
