import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWeekDayDto } from './dto/create-week_day.dto';
import { UpdateWeekDayDto } from './dto/update-week_day.dto';
import { InjectModel } from '@nestjs/sequelize';
import { WeekDay } from './entities/week_day.entity';

@Injectable()
export class WeekDayService {
  constructor(@InjectModel(WeekDay) private weekDayRepo: typeof WeekDay) {}

  create(createWeekDayDto: CreateWeekDayDto) {
    return this.weekDayRepo.create(createWeekDayDto);
  }

  findAll() {
    return this.weekDayRepo.findAll();
  }

  async findOne(id: number) {
    const day = await this.weekDayRepo.findByPk(id);
    if (!day) {
      throw new NotFoundException('Week-Day not found');
    }
    return day;
  }

  async update(id: number, updateWeekDayDto: UpdateWeekDayDto) {
    const [updatedCount, [updatedMarka]] = await this.weekDayRepo.update(
      updateWeekDayDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (updatedCount === 0) {
      throw new NotFoundException(`Week-Day with id ${id} not found`);
    }
    return updatedMarka;
  }

  async remove(id: number) {
    const deletedCount = await this.weekDayRepo.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new NotFoundException(`Week-Day with id ${id} not found`);
    }
    return `Week-Day with id ${id} has been successfully deleted`;
  }
}
