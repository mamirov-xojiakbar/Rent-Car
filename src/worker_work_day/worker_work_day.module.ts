import { Module } from '@nestjs/common';
import { WorkerWorkDayService } from './worker_work_day.service';
import { WorkerWorkDayController } from './worker_work_day.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkerWorkDay } from './entities/worker_work_day.entity';
import { WorkerModule } from 'src/worker/worker.module';
import { WeekDayModule } from 'src/week_day/week_day.module';

@Module({
  imports: [
    SequelizeModule.forFeature([WorkerWorkDay]),
    WorkerModule,
    WeekDayModule,
  ],
  controllers: [WorkerWorkDayController],
  providers: [WorkerWorkDayService],
})
export class WorkerWorkDayModule {}
