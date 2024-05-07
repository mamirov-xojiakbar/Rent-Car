import { Module } from '@nestjs/common';
import { MarkaService } from './marka.service';
import { MarkaController } from './marka.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Marka } from './entities/marka.entity';

@Module({
  imports: [SequelizeModule.forFeature([Marka])],
  controllers: [MarkaController],
  providers: [MarkaService],
  exports: [MarkaService]
})
export class MarkaModule {}
