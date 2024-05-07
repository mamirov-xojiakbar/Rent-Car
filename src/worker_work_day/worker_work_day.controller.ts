import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkerWorkDayService } from './worker_work_day.service';
import { CreateWorkerWorkDayDto } from './dto/create-worker_work_day.dto';
import { UpdateWorkerWorkDayDto } from './dto/update-worker_work_day.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { WorkerWorkDay } from './entities/worker_work_day.entity';

@ApiTags('Worker Work Day')
@Controller('worker-work-day')
export class WorkerWorkDayController {
  constructor(private readonly workerWorkDayService: WorkerWorkDayService) {}

  @ApiOperation({ summary: 'Create a new worker work day' })
  @ApiCreatedResponse({
    description: 'The worker work day has been successfully created',
    type: WorkerWorkDay,
  })
  @Post()
  create(@Body() createWorkerWorkDayDto: CreateWorkerWorkDayDto) {
    return this.workerWorkDayService.create(createWorkerWorkDayDto);
  }

  @ApiOperation({ summary: 'Get all worker work days' })
  @ApiOkResponse({
    description: 'List of all worker work days',
    type: [WorkerWorkDay],
  })
  @Get()
  findAll() {
    return this.workerWorkDayService.findAll();
  }

  @ApiOperation({ summary: 'Get a worker work day by ID' })
  @ApiOkResponse({
    description: 'The worker work day has been successfully found',
    type: WorkerWorkDay,
  })
  @ApiNotFoundResponse({ description: 'Worker work day not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workerWorkDayService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a worker work day by ID' })
  @ApiOkResponse({
    description: 'The worker work day has been successfully updated',
    type: WorkerWorkDay,
  })
  @ApiNotFoundResponse({ description: 'Worker work day not found' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkerWorkDayDto: UpdateWorkerWorkDayDto,
  ) {
    return this.workerWorkDayService.update(+id, updateWorkerWorkDayDto);
  }

  @ApiOperation({ summary: 'Delete a worker work day by ID' })
  @ApiOkResponse({
    description: 'The worker work day has been successfully deleted',
  })
  @ApiNotFoundResponse({ description: 'Worker work day not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workerWorkDayService.remove(+id);
  }
}
