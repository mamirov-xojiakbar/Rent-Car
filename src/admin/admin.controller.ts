import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './entities/admin.entity';
import { Response } from 'express';
import { LoginAdminDto } from './dto/login-admin.dto';
import { CookieGetter } from 'src/decorators/cookie_getter.decorator';
import { UpdatePasswordAdminDto } from './dto/update-password-admin.dto';
import { CreatorGuard } from 'src/guards/admin-creator.guard';
import { AdminSelfGuard } from 'src/guards/admin-self.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Create a new admin' })
  @ApiResponse({
    status: 201,
    description: 'The admin has been successfully created.',
    type: Admin,
  })
  @UseGuards(CreatorGuard)
  @Post()
  create(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.create(createAdminDto, res);
  }

  @ApiOperation({ summary: 'Login as a admin' })
  @ApiResponse({
    status: 200,
    description: 'Login successful. Returns authentication tokens.',
  })
  @Post('login')
  login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @ApiOperation({ summary: 'Logout a admin' })
  @ApiResponse({ status: 200, description: 'Logout successful.' })
  @HttpCode(200)
  @Post('logout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'Refresh authentication tokens for a admin' })
  @ApiResponse({ status: 200, description: 'Tokens refreshed successfully.' })
  @HttpCode(200)
  @Post('refresh/:id')
  refresh(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({ summary: 'Retrieve all admin' })
  @ApiResponse({
    status: 200,
    description: 'Returns all admin.',
    type: [Admin],
  })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a admin by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the admin.',
    type: Admin,
  })
  @UseGuards(CreatorGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(AdminSelfGuard)
  @UseGuards(AdminGuard)
  @Get('self/:id')
  findSelf(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a admin' })
  @ApiResponse({ status: 200, description: 'Admin updated successfully.' })
  @UseGuards(CreatorGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Update password a admin' })
  @ApiResponse({
    status: 200,
    description: 'Admin password updated successfully.',
  })
  @Patch('password/:id')
  @UseGuards(CreatorGuard)
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordAdminDto,
  ) {
    return this.adminService.updatePassword(+id, updatePasswordDto);
  }

  @ApiOperation({ summary: 'Remove a admin' })
  @ApiResponse({ status: 200, description: 'Admin removed successfully.' })
  @UseGuards(CreatorGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
