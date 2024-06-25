import { Module } from '@nestjs/common';
import { DailyScheduleService } from './daily-schedule.service';
import { DailyScheduleController } from './daily-schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailySchedule } from '../../common/entities/daily-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DailySchedule])],
  controllers: [DailyScheduleController],
  providers: [DailyScheduleService],
})
export class DailyScheduleModule {}
