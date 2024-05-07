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
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger'; 
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { AdminGuard } from 'src/guards/admin.guard';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @ApiOkResponse({ description: 'Successfully created car', type: Car })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @UseGuards(AdminGuard)
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Successfully retrieved cars', type: [Car] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Successfully retrieved car', type: Car })
  @ApiNotFoundResponse({ description: 'Car not found' })
  @ApiParam({ name: 'id', description: 'Car ID' })
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Successfully updated car', type: Car })
  @ApiNotFoundResponse({ description: 'Car not found' })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  @ApiParam({ name: 'id', description: 'Car ID' })
  @ApiBody({ type: UpdateCarDto })
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id, updateCarDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Successfully deleted car' })
  @ApiNotFoundResponse({ description: 'Car not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiParam({ name: 'id', description: 'Car ID' })
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
