import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Worker } from './entities/worker.entity';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Worker]),
    JwtModule.register({}),
    MailModule,
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
  exports: [WorkerService]
})
export class WorkerModule {}
