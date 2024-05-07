import { PartialType } from '@nestjs/swagger';
import { CreateWorkerWorkDayDto } from './create-worker_work_day.dto';

export class UpdateWorkerWorkDayDto extends PartialType(CreateWorkerWorkDayDto) {}
