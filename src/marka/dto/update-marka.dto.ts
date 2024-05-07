import { PartialType } from '@nestjs/swagger';
import { CreateMarkaDto } from './create-marka.dto';

export class UpdateMarkaDto extends PartialType(CreateMarkaDto) {}
