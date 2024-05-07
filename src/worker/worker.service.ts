import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Worker } from './entities/worker.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginWorkerDto } from './dto/login-worker.dto';
import { Response } from 'express';

import * as bcrypt from 'bcrypt';
import { UpdatePasswordWorkerDto } from './dto/update-password-worker.dto';

@Injectable()
export class WorkerService {
  constructor(
    @InjectModel(Worker) private readonly workerRepo: typeof Worker,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(worker: Worker) {
    const payload = {
      id: worker.id,
      is_active: worker.is_active,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY_WORKER,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY_WORKER,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async login(loginWorkerDto: LoginWorkerDto, res: Response) {
    const { login, password } = loginWorkerDto;
    const worker = await this.workerRepo.findOne({ where: { login } });
    if (!worker) {
      throw new BadRequestException('Worker not found');
    }

    const isMatchPass = await bcrypt.compare(password, worker.hashed_password);
    if (!isMatchPass) {
      throw new BadRequestException('Password do not match');
    }

    const tokens = await this.getTokens(worker);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updateWorker = await this.workerRepo.update(
      { hashed_refresh_token, is_active: true },
      {
        where: { id: worker.id },
        returning: true,
      },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Worker logged in',
      worker: updateWorker[1][0],
      tokens,
    };
    return response;
  }

  async create(createWorkerDto: CreateWorkerDto, res: Response) {
    const worker = await this.workerRepo.findOne({
      where: { login: createWorkerDto.login },
    });

    if (worker) {
      throw new BadRequestException('There is such a worker');
    }

    if (createWorkerDto.password !== createWorkerDto.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashed_password = await bcrypt.hash(createWorkerDto.password, 7);
    const newAdmin = await this.workerRepo.create({
      ...createWorkerDto,
      hashed_password,
    });

    const response = {
      message: 'worker registered',
      user: newAdmin,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const workerData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY_WORKER,
    });
    if (!workerData) {
      throw new ForbiddenException('Worker not verified');
    }

    const updateWorker = await this.workerRepo.update(
      { hashed_refresh_token: null },
      { where: { id: workerData.id }, returning: true },
    );
    console.log(updateWorker);

    res.clearCookie('refresh_token');
    const response = {
      message: 'Worker logged out successfully',
      user_refresh_token: updateWorker[1][0].hashed_refresh_token,
    };

    return response;
  }

  async refreshToken(workerId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (workerId !== decodedToken['id']) {
      throw new BadRequestException('id does not match');
    }

    const worker = await this.workerRepo.findOne({
      where: { id: workerId },
    });

    if (!worker || !worker.hashed_refresh_token) {
      throw new BadRequestException('Worker not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      worker.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(worker);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updateAdmin = await this.workerRepo.update(
      { hashed_refresh_token },
      {
        where: { id: worker.id },
        returning: true,
      },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Worker refreshed token',
      worker: updateAdmin[1][0],
      tokens,
    };
    return response;
  }

  findAll() {
    return this.workerRepo.findAll();
  }

  async findOne(id: number) {
    const worker = await this.workerRepo.findByPk(id);
    if (!worker) {
      throw new NotFoundException('Worker not found');
    }
    return worker;
  }

  async update(id: number, updateWorkerDto: UpdateWorkerDto) {
    const worker = await this.workerRepo.findByPk(id);

    if (!worker) {
      throw new NotFoundException('Worker not found');
    }

    const updatedWorker = await this.workerRepo.update(updateWorkerDto, {
      where: { id },
      returning: true,
    });

    const response = {
      message: 'Worker updated',
      user: updatedWorker[1][0],
    };
    return response;
  }

  async updatePassword(id: number, updatePassword: UpdatePasswordWorkerDto) {
    const worker = await this.workerRepo.findByPk(id);

    if (!worker) {
      throw new NotFoundException('Worker not found');
    }

    const oldPassword = await bcrypt.compare(
      updatePassword.password,
      worker.hashed_password,
    );

    if (!oldPassword) {
      throw new BadRequestException('Old password is wrong');
    }

    if (updatePassword.new_password !== updatePassword.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(updatePassword.new_password, 7);
    worker.hashed_password = hashedPassword;

    const updatedAdmin = await this.workerRepo.update(
      { hashed_password: hashedPassword },
      { where: { id } },
    );

    if (!updatedAdmin) {
      throw new InternalServerErrorException('Failed to update password');
    }

    const response = {
      message: 'Password updated',
    };
    return response;
  }

  async remove(id: number) {
    const rowsAffected = await this.workerRepo.destroy({ where: { id } });
    if (rowsAffected === 0) {
      throw new NotFoundException('Worker not found');
    }
    return { message: 'Deleted worker' };
  }
}
