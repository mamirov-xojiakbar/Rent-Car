import { PartialType } from '@nestjs/swagger';
import { CreateWeekDayDto } from './create-week_day.dto';

export class UpdateWeekDayDto extends PartialType(CreateWeekDayDto) {}
