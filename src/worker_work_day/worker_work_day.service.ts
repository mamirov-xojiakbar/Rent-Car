import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkerWorkDayDto } from './dto/create-worker_work_day.dto';
import { UpdateWorkerWorkDayDto } from './dto/update-worker_work_day.dto';
import { InjectModel } from '@nestjs/sequelize';
import { WorkerWorkDay } from './entities/worker_work_day.entity';
import { WorkerService } from 'src/worker/worker.service';
import { WeekDayService } from 'src/week_day/week_day.service';

@Injectable()
export class WorkerWorkDayService {
  constructor(
    @InjectModel(WorkerWorkDay) private workerWorkDayRepo: typeof WorkerWorkDay,
    private readonly workerService: WorkerService,
    private readonly weekDayService: WeekDayService,
  ) {}

  async create(createWorkerWorkDayDto: CreateWorkerWorkDayDto) {
    await this.workerService.findOne(createWorkerWorkDayDto.workerId);
    await this.weekDayService.findOne(createWorkerWorkDayDto.weekDayId);

    const worker = await this.workerWorkDayRepo.findOne({
      where: { workerId: createWorkerWorkDayDto.workerId },
    });

    const weekDay = await this.workerWorkDayRepo.findOne({
      where: { weekDayId: createWorkerWorkDayDto.weekDayId },
    });

    if(worker && weekDay) {
      throw new BadRequestException('Already exists');
    }

    const newCar = await this.workerWorkDayRepo.create(createWorkerWorkDayDto);

    return {
      message: 'Create new worker-work-day successfully',
      worker_work_day: newCar,
    };
  }

  findAll() {
    return this.workerWorkDayRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const car = await this.workerWorkDayRepo.findByPk(id, {
      include: { all: true },
    });
    if (!car) {
      throw new NotFoundException('worker-work-day not found');
    }
    return car;
  }

  async update(id: number, updateWorkerWorkDayDto: UpdateWorkerWorkDayDto) {
    const car = await this.workerWorkDayRepo.findByPk(id);
    if (!car) {
      throw new NotFoundException(`Worker-work-day with ID ${id} not found`);
    }

    await this.workerService.findOne(updateWorkerWorkDayDto.workerId);
    await this.weekDayService.findOne(updateWorkerWorkDayDto.weekDayId);

    const updateCar = await car.update(updateWorkerWorkDayDto);

    return {
      message: `Worker-work-day with ID ${id} updated successfully`,
      car: updateCar,
    };
  }

  async remove(id: number) {
    const rowsAffected = await this.workerWorkDayRepo.destroy({
      where: { id },
    });
    if (rowsAffected === 0) {
      throw new NotFoundException('Worker-work-day not found');
    }
    return { message: 'Deleted Worker-work-day' };
  }
}
