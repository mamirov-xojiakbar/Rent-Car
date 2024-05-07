import { PartialType } from '@nestjs/swagger';
import { CreateCarPriceDto } from './create-car_price.dto';

export class UpdateCarPriceDto extends PartialType(CreateCarPriceDto) {}
