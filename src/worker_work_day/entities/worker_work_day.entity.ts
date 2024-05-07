import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { WeekDay } from 'src/week_day/entities/week_day.entity';
import { Worker } from 'src/worker/entities/worker.entity';

interface IWorkerWorkDayCreationAttr {
  weekDayId: number;
  workerId: number;
  start_time: string;
  end_time: string;
}

@Table({ tableName: 'worker_work_day' })
export class WorkerWorkDay extends Model<
  WorkerWorkDay,
  IWorkerWorkDayCreationAttr
> {
  @ApiProperty({
    example: '1',
    description: 'The unique identifier for the worker-work-day',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => WeekDay)
  @Column({ type: DataType.INTEGER })
  weekDayId: number;

  @ForeignKey(() => Worker)
  @Column({ type: DataType.INTEGER })
  workerId: number;

  @Column({ type: DataType.STRING })
  start_time: string;

  @Column({ type: DataType.STRING })
  end_time: string;

  @BelongsTo(() => WeekDay)
  week_day: WeekDay[];

  @BelongsTo(() => Worker)
  worker: Worker;
}
