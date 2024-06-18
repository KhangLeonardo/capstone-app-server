import { Module } from '@nestjs/common';
import { DailyScheduleService } from './daily-schedule.service';
import { DailyScheduleController } from './daily-schedule.controller';

@Module({
  controllers: [DailyScheduleController],
  providers: [DailyScheduleService],
})
export class DailyScheduleModule {}
