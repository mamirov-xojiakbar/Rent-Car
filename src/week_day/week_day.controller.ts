import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WeekDayService } from './week_day.service';
import { CreateWeekDayDto } from './dto/create-week_day.dto';
import { UpdateWeekDayDto } from './dto/update-week_day.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { WeekDay } from './entities/week_day.entity';

@ApiTags('Week Day')
@Controller('week-day')
export class WeekDayController {
  constructor(private readonly weekDayService: WeekDayService) {}

  @ApiOperation({ summary: 'Create a new week day' })
  @ApiCreatedResponse({
    description: 'The week day has been successfully created',
    type: WeekDay,
  })
  @Post()
  create(@Body() createWeekDayDto: CreateWeekDayDto) {
    return this.weekDayService.create(createWeekDayDto);
  }

  @ApiOperation({ summary: 'Get all week days' })
  @ApiOkResponse({ description: 'List of all week days', type: [WeekDay] })
  @Get()
  findAll() {
    return this.weekDayService.findAll();
  }

  @ApiOperation({ summary: 'Get a week day by ID' })
  @ApiOkResponse({
    description: 'The week day has been successfully found',
    type: WeekDay,
  })
  @ApiNotFoundResponse({ description: 'Week day not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weekDayService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a week day by ID' })
  @ApiOkResponse({
    description: 'The week day has been successfully updated',
    type: WeekDay,
  })
  @ApiNotFoundResponse({ description: 'Week day not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeekDayDto: UpdateWeekDayDto) {
    return this.weekDayService.update(+id, updateWeekDayDto);
  }

  @ApiOperation({ summary: 'Delete a week day by ID' })
  @ApiOkResponse({ description: 'The week day has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'Week day not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weekDayService.remove(+id);
  }
}
