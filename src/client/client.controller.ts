import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Client } from './entities/client.entity';
import { Response } from 'express';
import { LoginClientDto } from './dto/login-client.dto';
import { CookieGetter } from 'src/decorators/cookie_getter.decorator';
import { UpdatePasswordClientDto } from './dto/update-password-client.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { ClientGuard } from 'src/guards/doctor.guard';
import { ClientSelfGuard } from 'src/guards/doctor-self.guard';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'Register a new client' })
  @ApiResponse({
    status: 201,
    description: 'The client has been successfully registered.',
    type: Client,
  })
  @Post('signup')
  signUp(
    @Body() createClientDto: CreateClientDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.clientService.signUp(createClientDto, res);
  }

  @ApiOperation({ summary: 'Activate client account' })
  @ApiResponse({
    status: 200,
    description: 'Client account activated successfully.',
  })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.clientService.activate(link);
  }

  @ApiOperation({ summary: 'Login as a client' })
  @ApiResponse({
    status: 200,
    description: 'Login successful. Returns authentication tokens.',
  })
  @Post('login')
  login(
    @Body() loginClientDto: LoginClientDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.clientService.login(loginClientDto, res);
  }

  @ApiOperation({ summary: 'Logout a client' })
  @ApiResponse({ status: 200, description: 'Logout successful.' })
  @HttpCode(200)
  @Post('logout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.clientService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'Refresh authentication tokens for a client' })
  @ApiResponse({ status: 200, description: 'Tokens refreshed successfully.' })
  @HttpCode(200)
  @Post('refresh/:id')
  refresh(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.clientService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({ summary: 'Retrieve all client' })
  @ApiResponse({
    status: 200,
    description: 'Returns all clients.',
    type: [Client],
  })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a client by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the client.',
    type: Client,
  })
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @UseGuards(ClientSelfGuard)
  @UseGuards(ClientGuard)
  @Get('self/:id')
  findOneSelf(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update password a client' })
  @ApiResponse({
    status: 200,
    description: 'Client password updated successfully.',
  })
  @Patch('password/:id')
  @UseGuards(ClientSelfGuard)
  @UseGuards(ClientGuard)
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordClientDto,
  ) {
    return this.clientService.updatePassword(+id, updatePasswordDto);
  }

  @ApiOperation({ summary: 'Update a client' })
  @ApiResponse({ status: 200, description: 'Client updated successfully.' })
  @UseGuards(ClientSelfGuard)
  @UseGuards(ClientGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @ApiOperation({ summary: 'Remove a client' })
  @ApiResponse({ status: 200, description: 'Client removed successfully.' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
