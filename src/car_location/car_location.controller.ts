import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CarLocationService } from './car_location.service';
import { CreateCarLocationDto } from './dto/create-car_location.dto';
import { UpdateCarLocationDto } from './dto/update-car_location.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CarLocation } from './entities/car_location.entity';
import { AdminGuard } from 'src/guards/admin.guard';

@ApiTags('Car Location')
@Controller('car-location')
export class CarLocationController {
  constructor(private readonly carLocationService: CarLocationService) {}

  @ApiOperation({ summary: 'Create a new car location' })
  @ApiCreatedResponse({
    description: 'The car location has been successfully created',
    type: CarLocation,
  })
  @UseGuards(AdminGuard)
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post()
  create(@Body() createCarLocationDto: CreateCarLocationDto) {
    return this.carLocationService.create(createCarLocationDto);
  }

  @ApiOperation({ summary: 'Get all car locations' })
  @ApiOkResponse({
    description: 'List of all car locations',
    type: [CarLocation],
  })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.carLocationService.findAll();
  }

  @ApiOperation({ summary: 'Get a car location by ID' })
  @ApiOkResponse({
    description: 'The car location has been successfully found',
    type: CarLocation,
  })
  @ApiNotFoundResponse({ description: 'Car location not found' })
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carLocationService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a car location by ID' })
  @ApiOkResponse({
    description: 'The car location has been successfully updated',
    type: CarLocation,
  })
  @ApiNotFoundResponse({ description: 'Car location not found' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarLocationDto: UpdateCarLocationDto,
  ) {
    return this.carLocationService.update(+id, updateCarLocationDto);
  }

  @ApiOperation({ summary: 'Delete a car location by ID' })
  @ApiOkResponse({
    description: 'The car location has been successfully deleted',
  })
  @ApiNotFoundResponse({ description: 'Car location not found' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carLocationService.remove(+id);
  }
}
