import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarPhotoService } from './car_photo.service';
import { CreateCarPhotoDto } from './dto/create-car_photo.dto';
import { UpdateCarPhotoDto } from './dto/update-car_photo.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CarPhoto } from './entities/car_photo.entity';

@ApiTags('Car Photo')
@Controller('car-photo')
export class CarPhotoController {
  constructor(private readonly carPhotoService: CarPhotoService) {}

  @ApiOperation({ summary: 'Create a new car photo' })
  @ApiCreatedResponse({
    description: 'The car photo has been successfully created',
    type: CarPhoto,
  })
  @Post()
  create(@Body() createCarPhotoDto: CreateCarPhotoDto) {
    return this.carPhotoService.create(createCarPhotoDto);
  }

  @ApiOperation({ summary: 'Get all car photos' })
  @ApiOkResponse({ description: 'List of all car photos', type: [CarPhoto] })
  @Get()
  findAll() {
    return this.carPhotoService.findAll();
  }

  @ApiOperation({ summary: 'Get a car photo by ID' })
  @ApiOkResponse({
    description: 'The car photo has been successfully found',
    type: CarPhoto,
  })
  @ApiNotFoundResponse({ description: 'Car photo not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carPhotoService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a car photo by ID' })
  @ApiOkResponse({
    description: 'The car photo has been successfully updated',
    type: CarPhoto,
  })
  @ApiNotFoundResponse({ description: 'Car photo not found' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarPhotoDto: UpdateCarPhotoDto,
  ) {
    return this.carPhotoService.update(+id, updateCarPhotoDto);
  }

  @ApiOperation({ summary: 'Delete a car photo by ID' })
  @ApiOkResponse({ description: 'The car photo has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'Car photo not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carPhotoService.remove(+id);
  }
}
