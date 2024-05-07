import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Status } from './entities/status.entity';

@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({ summary: 'Create a new status' })
  @ApiCreatedResponse({
    description: 'The status has been successfully created',
    type: Status,
  })
  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @ApiOperation({ summary: 'Get all statuses' })
  @ApiOkResponse({ description: 'List of all statuses', type: [Status] })
  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @ApiOperation({ summary: 'Get a status by ID' })
  @ApiOkResponse({
    description: 'The status has been successfully found',
    type: Status,
  })
  @ApiNotFoundResponse({ description: 'Status not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a status by ID' })
  @ApiOkResponse({
    description: 'The status has been successfully updated',
    type: Status,
  })
  @ApiNotFoundResponse({ description: 'Status not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.update(+id, updateStatusDto);
  }

  @ApiOperation({ summary: 'Delete a status by ID' })
  @ApiOkResponse({ description: 'The status has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'Status not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusService.remove(+id);
  }
}
