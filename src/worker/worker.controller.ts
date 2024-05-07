import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { Worker } from './entities/worker.entity';
import { Response } from 'express';
import { LoginAdminDto } from 'src/admin/dto/login-admin.dto';
import { CookieGetter } from 'src/decorators/cookie_getter.decorator';
import { UpdatePasswordWorkerDto } from './dto/update-password-worker.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { WorkerSelfGuard } from 'src/guards/patient-self.guard';
import { WorkerGuard } from 'src/guards/patient.guard';

@ApiTags('Worker')
@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @ApiOperation({ summary: 'Create a new worker' })
  @ApiResponse({
    status: 201,
    description: 'The admin has been successfully created.',
    type: Worker,
  })
  @UseGuards(AdminGuard)
  @Post()
  create(
    @Body() createWorkerDto: CreateWorkerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workerService.create(createWorkerDto, res);
  }

  @ApiOperation({ summary: 'Login as a worker' })
  @ApiResponse({
    status: 200,
    description: 'Login successful. Returns authentication tokens.',
  })
  @Post('login')
  login(
    @Body() loginWorkerDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workerService.login(loginWorkerDto, res);
  }

  @ApiOperation({ summary: 'Logout a worker' })
  @ApiResponse({ status: 200, description: 'Logout successful.' })
  @HttpCode(200)
  @Post('logout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workerService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'Refresh authentication tokens for a worker' })
  @ApiResponse({ status: 200, description: 'Tokens refreshed successfully.' })
  @HttpCode(200)
  @Post('refresh/:id')
  refresh(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workerService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({ summary: 'Get all workers' })
  @ApiOkResponse({ description: 'List of all workers', type: [Worker] })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.workerService.findAll();
  }

  @ApiOperation({ summary: 'Get a worker by ID' })
  @ApiOkResponse({
    description: 'The worker has been successfully found',
    type: Worker,
  })
  @ApiNotFoundResponse({ description: 'Worker not found' })
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workerService.findOne(+id);
  }

  @UseGuards(WorkerSelfGuard)
  @UseGuards(WorkerGuard)
  @Get('self/:id')
  findOneSelf(@Param('id') id: string) {
    return this.workerService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a worker by ID' })
  @ApiOkResponse({
    description: 'The worker has been successfully updated',
    type: Worker,
  })
  @ApiNotFoundResponse({ description: 'Worker not found' })
  @UseGuards(WorkerSelfGuard)
  @UseGuards(WorkerGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkerDto: UpdateWorkerDto) {
    return this.workerService.update(+id, updateWorkerDto);
  }

  @ApiOperation({ summary: 'Update password a worker' })
  @ApiResponse({
    status: 200,
    description: 'Worker password updated successfully.',
  })
  @UseGuards(WorkerSelfGuard)
  @UseGuards(WorkerGuard)
  @Patch('password/:id')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordWorkerDto,
  ) {
    return this.workerService.updatePassword(+id, updatePasswordDto);
  }

  @ApiOperation({ summary: 'Delete a worker by ID' })
  @ApiOkResponse({ description: 'The worker has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'Worker not found' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workerService.remove(+id);
  }
}
