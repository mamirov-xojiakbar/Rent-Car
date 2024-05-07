import { PartialType } from '@nestjs/swagger';
import { CreateCarPhotoDto } from './create-car_photo.dto';

export class UpdateCarPhotoDto extends PartialType(CreateCarPhotoDto) {}
