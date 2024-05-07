import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './entities/client.entity';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { Response } from 'express';

import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { log } from 'console';
import { LoginClientDto } from './dto/login-client.dto';
import { UpdatePasswordClientDto } from './dto/update-password-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client) private readonly clientRepo: typeof Client,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async getTokens(client: Client) {
    const payload = {
      id: client.id,
      is_active: client.is_active,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async signUp(createClientDto: CreateClientDto, res: Response) {
    const patient = await this.clientRepo.findOne({
      where: { email: createClientDto.email },
    });

    if (patient) {
      throw new BadRequestException('There is such a client');
    }

    if (createClientDto.password !== createClientDto.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashed_password = await bcrypt.hash(createClientDto.password, 7);
    const newClient = await this.clientRepo.create({
      ...createClientDto,
      hashed_password,
    });

    const tokens = await this.getTokens(newClient);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const activation_link = v4();

    const updateClient = await this.clientRepo.update(
      { hashed_refresh_token, activation_link },
      {
        where: { id: newClient.id },
        returning: true,
      },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendMailClient(updateClient[1][0]);
    } catch (error) {
      log(error);
      throw new BadRequestException('Xatni yuborishda xatolik');
    }

    const response = {
      message: 'Client registered',
      user: updateClient[1][0],
      tokens,
    };
    return response;
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link yuq');
    }
    const updatePatient = await this.clientRepo.update(
      { is_active: true },
      {
        where: { activation_link: link, is_active: false },
        returning: true,
      },
    );
    if (!updatePatient[1][0]) {
      throw new BadRequestException('Client already activated');
    }
    const response = {
      message: 'Client activated successfully',
      client: updatePatient[1][0].is_active,
    };
    return response;
  }

  async login(loginClientDto: LoginClientDto, res: Response) {
    const { email, password } = loginClientDto;
    const client = await this.clientRepo.findOne({ where: { email } });
    if (!client) {
      throw new BadRequestException('Client not found');
    }
    if (!client.is_active) {
      throw new BadRequestException('Client not activated');
    }

    const isMatchPass = await bcrypt.compare(password, client.hashed_password);
    if (!isMatchPass) {
      throw new BadRequestException('Password do not match');
    }

    const tokens = await this.getTokens(client);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const activation_link = v4();

    const updateClient = await this.clientRepo.update(
      { hashed_refresh_token, activation_link },
      {
        where: { id: client.id },
        returning: true,
      },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Patient logged in',
      patient: updateClient[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const clientData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!clientData) {
      throw new ForbiddenException('Client not verified');
    }
    console.log(clientData.id);

    const updateClient = await this.clientRepo.update(
      { hashed_refresh_token: null },
      { where: { id: clientData.id }, returning: true },
    );
    console.log(updateClient);

    res.clearCookie('refresh_token');
    const response = {
      message: 'Client logged out successfully',
      user_refresh_token: updateClient[1][0].hashed_refresh_token,
    };

    return response;
  }

  async refreshToken(clientId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (clientId !== decodedToken['id']) {
      throw new BadRequestException('id does not match');
    }

    const client = await this.clientRepo.findOne({
      where: { id: clientId },
    });

    if (!client || !client.hashed_refresh_token) {
      throw new BadRequestException('Patient not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      client.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(client);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const activation_link = v4();

    const updatePatient = await this.clientRepo.update(
      { hashed_refresh_token, activation_link },
      {
        where: { id: client.id },
        returning: true,
      },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Patient refreshed token',
      patient: updatePatient[1][0],
      tokens,
    };
    return response;
  }

  findAll() {
    return this.clientRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const patient = await this.clientRepo.findByPk(id);
    if (!patient) {
      throw new NotFoundException('Client not found');
    }
    return patient;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepo.findByPk(id);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const updatedClient = await this.clientRepo.update(updateClientDto, {
      where: { id },
      returning: true,
    });

    const response = {
      message: 'Admin updated',
      user: updatedClient[1][0],
    };
    return response;
  }

  async updatePassword(id: number, updatePassword: UpdatePasswordClientDto) { 
    const client = await this.clientRepo.findByPk(id);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const oldPassword = await bcrypt.compare(
      updatePassword.password,
      client.hashed_password,
    );

    if (!oldPassword) {
      throw new BadRequestException('Old password is wrong');
    }

    if (updatePassword.new_password !== updatePassword.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(updatePassword.new_password, 7);
    client.hashed_password = hashedPassword;

    const updatedClient = await this.clientRepo.update(
      { hashed_password: hashedPassword },
      { where: { id } },
    );

    if (!updatedClient) {
      throw new InternalServerErrorException('Failed to update password');
    }

    const response = {
      message: 'Password updated',
    };
    return response;
  }

  async remove(id: number) {
    const rowsAffected = await this.clientRepo.destroy({ where: { id } });
    if (rowsAffected === 0) {
      throw new NotFoundException('Patient not found');
    }
    return { message: 'Deleted Patient' };
  }
}
