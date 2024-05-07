import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
import { CarPriceService } from './car_price.service';
import { CreateCarPriceDto } from './dto/create-car_price.dto';
import { UpdateCarPriceDto } from './dto/update-car_price.dto';
import { CarPrice } from './entities/car_price.entity';

@ApiTags('Car-Price') 
@Controller('car-price')
export class CarPriceController {
  constructor(private readonly carPriceService: CarPriceService) {}

  @Post()
  @ApiOkResponse({
    description: 'Successfully created car price',
    type: CarPrice,
  })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' }) 
  create(@Body() createCarPriceDto: CreateCarPriceDto) {
    return this.carPriceService.create(createCarPriceDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Successfully retrieved car prices',
    type: [CarPrice],
  }) 
  @ApiInternalServerErrorResponse({ description: 'Internal server error' }) 
  findAll() {
    return this.carPriceService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Successfully retrieved car price',
    type: CarPrice,
  }) 
  @ApiNotFoundResponse({ description: 'Car price not found' }) 
  @ApiParam({ name: 'id', description: 'Car price ID' }) 
  findOne(@Param('id') id: string) {
    return this.carPriceService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Successfully updated car price',
    type: CarPrice,
  }) 
  @ApiNotFoundResponse({ description: 'Car price not found' }) 
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  @ApiParam({ name: 'id', description: 'Car price ID' }) 
  @ApiBody({ type: UpdateCarPriceDto }) 
  update(
    @Param('id') id: string,
    @Body() updateCarPriceDto: UpdateCarPriceDto,
  ) {
    return this.carPriceService.update(+id, updateCarPriceDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Successfully deleted car price' }) 
  @ApiNotFoundResponse({ description: 'Car price not found' }) 
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiParam({ name: 'id', description: 'Car price ID' }) 
  remove(@Param('id') id: string) {
    return this.carPriceService.remove(+id);
  }
}
