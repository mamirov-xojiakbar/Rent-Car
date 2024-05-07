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
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Models } from './entities/model.entity';

@ApiTags('Model') 
@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post()
  @ApiOkResponse({ description: 'Successfully created model', type: Models }) 
  @ApiBadRequestResponse({ description: 'Invalid data provided' }) 
  @ApiInternalServerErrorResponse({ description: 'Internal server error' }) 
  create(@Body() createModelDto: CreateModelDto) {
    return this.modelService.create(createModelDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Successfully retrieved models',
    type: [Models],
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' }) 
  findAll() {
    return this.modelService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Successfully retrieved model', type: Models }) 
  @ApiNotFoundResponse({ description: 'Model not found' }) 
  @ApiParam({ name: 'id', description: 'Model ID' }) 
  findOne(@Param('id') id: string) {
    return this.modelService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Successfully updated model', type: Models }) 
  @ApiNotFoundResponse({ description: 'Model not found' }) 
  @ApiBadRequestResponse({ description: 'Invalid data provided' }) 
  @ApiParam({ name: 'id', description: 'Model ID' })
  @ApiBody({ type: UpdateModelDto }) 
  update(@Param('id') id: string, @Body() updateModelDto: UpdateModelDto) {
    return this.modelService.update(+id, updateModelDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Successfully deleted model' }) 
  @ApiNotFoundResponse({ description: 'Model not found' }) 
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiParam({ name: 'id', description: 'Model ID' }) 
  remove(@Param('id') id: string) {
    return this.modelService.remove(+id);
  }
}
