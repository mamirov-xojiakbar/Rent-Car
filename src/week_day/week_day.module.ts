import { Module } from '@nestjs/common';
import { WeekDayService } from './week_day.service';
import { WeekDayController } from './week_day.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { WeekDay } from './entities/week_day.entity';

@Module({
  imports: [SequelizeModule.forFeature([WeekDay])],
  controllers: [WeekDayController],
  providers: [WeekDayService],
  exports: [WeekDayService]
})
export class WeekDayModule {}
