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
import { MarkaService } from './marka.service';
import { CreateMarkaDto } from './dto/create-marka.dto';
import { UpdateMarkaDto } from './dto/update-marka.dto';
import { Marka } from './entities/marka.entity';

@ApiTags('Marka') 
@Controller('marka')
export class MarkaController {
  constructor(private readonly markaService: MarkaService) {}

  @Post()
  @ApiOkResponse({ description: 'Successfully created marka', type: Marka }) 
  @ApiBadRequestResponse({ description: 'Invalid data provided' }) 
  @ApiInternalServerErrorResponse({ description: 'Internal server error' }) 
  create(@Body() createMarkaDto: CreateMarkaDto) {
    return this.markaService.create(createMarkaDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Successfully retrieved markas',
    type: [Marka],
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' }) 
  findAll() {
    return this.markaService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Successfully retrieved marka', type: Marka })
  @ApiNotFoundResponse({ description: 'Marka not found' }) 
  @ApiParam({ name: 'id', description: 'Marka ID' }) 
  findOne(@Param('id') id: string) {
    return this.markaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Successfully updated marka', type: Marka })
  @ApiNotFoundResponse({ description: 'Marka not found' }) 
  @ApiBadRequestResponse({ description: 'Invalid data provided' }) 
  @ApiParam({ name: 'id', description: 'Marka ID' }) 
  @ApiBody({ type: UpdateMarkaDto }) 
  update(@Param('id') id: string, @Body() updateMarkaDto: UpdateMarkaDto) {
    return this.markaService.update(+id, updateMarkaDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Successfully deleted marka' }) 
  @ApiNotFoundResponse({ description: 'Marka not found' }) 
  @ApiInternalServerErrorResponse({ description: 'Internal server error' }) 
  @ApiParam({ name: 'id', description: 'Marka ID' }) 
  remove(@Param('id') id: string) {
    return this.markaService.remove(+id);
  }
}
