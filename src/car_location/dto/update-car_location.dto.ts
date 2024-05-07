import { PartialType } from '@nestjs/swagger';
import { CreateCarLocationDto } from './create-car_location.dto';

export class UpdateCarLocationDto extends PartialType(CreateCarLocationDto) {}
