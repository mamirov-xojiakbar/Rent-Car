import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './entities/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { LoginAdminDto } from './dto/login-admin.dto';

import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { Response } from 'express';
import { UpdatePasswordAdminDto } from './dto/update-password-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminRepo: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY_ADMIN,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY_ADMIN,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const { login, password } = loginAdminDto;
    const admin = await this.adminRepo.findOne({ where: { login } });
    if (!admin) {
      throw new BadRequestException('Admin not found');
    }

    const isMatchPass = await bcrypt.compare(password, admin.hashed_password);
    if (!isMatchPass) {
      throw new BadRequestException('Password do not match');
    }

    const tokens = await this.getTokens(admin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updateAdmin = await this.adminRepo.update(
      { hashed_refresh_token, is_active: true },
      {
        where: { id: admin.id },
        returning: true,
      },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Admin logged in',
      admin: updateAdmin[1][0],
      tokens,
    };
    return response;
  }

  async create(createAdminDto: CreateAdminDto, res: Response) {
    const admin = await this.adminRepo.findOne({
      where: { login: createAdminDto.login },
    });

    if (admin) {
      throw new BadRequestException('There is such a admin');
    }

    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminRepo.create({
      ...createAdminDto,
      hashed_password,
    });

    const response = {
      message: 'admin registered',
      user: newAdmin,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY_ADMIN,
    });
    if (!adminData) {
      throw new ForbiddenException('Admin not verified');
    }

    const updateUser = await this.adminRepo.update(
      { hashed_refresh_token: null },
      { where: { id: adminData.id }, returning: true },
    );
    console.log(updateUser);

    res.clearCookie('refresh_token');
    const response = {
      message: 'Admin logged out successfully',
      user_refresh_token: updateUser[1][0].hashed_refresh_token,
    };

    return response;
  }

  async refreshToken(adminId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (adminId !== decodedToken['id']) {
      throw new BadRequestException('id does not match');
    }

    const admin = await this.adminRepo.findOne({
      where: { id: adminId },
    });

    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException('Admin not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      admin.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(admin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updateAdmin = await this.adminRepo.update(
      { hashed_refresh_token },
      {
        where: { id: admin.id },
        returning: true,
      },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Admin refreshed token',
      admin: updateAdmin[1][0],
      tokens,
    };
    return response;
  }

  findAll() {
    return this.adminRepo.findAll();
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findByPk(id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepo.findByPk(id);

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    const updatedAdmin = await this.adminRepo.update(updateAdminDto, {
      where: { id },
      returning: true,
    });

    const response = {
      message: 'Admin updated',
      user: updatedAdmin[1][0],
    };
    return response;
  }

  async updatePassword(id: number, updatePassword: UpdatePasswordAdminDto) {
    const admin = await this.adminRepo.findByPk(id);

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    const oldPassword = await bcrypt.compare(
      updatePassword.password,
      admin.hashed_password,
    );

    if (!oldPassword) {
      throw new BadRequestException('Old password is wrong');
    }

    if (updatePassword.new_password !== updatePassword.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(updatePassword.new_password, 7);
    admin.hashed_password = hashedPassword;

    const updatedAdmin = await this.adminRepo.update(
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
    const rowsAffected = await this.adminRepo.destroy({ where: { id } });
    if (rowsAffected === 0) {
      throw new NotFoundException('Admin not found');
    }
    return { message: 'Deleted Admin' };
  }
}
