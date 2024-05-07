import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Models } from './entities/model.entity';
import { MarkaModule } from 'src/marka/marka.module';

@Module({
  imports: [SequelizeModule.forFeature([Models]), MarkaModule],
  controllers: [ModelController],
  providers: [ModelService],
  exports: [ModelService],
})
export class ModelModule {}
