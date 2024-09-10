import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EatingScheduleController } from './eating_schedule.controller';
import { EatingScheduleService } from './eating_schedule.service';
import { EatingSchedule } from '../../common/entities/eating-schedule.entity';
import { Student } from 'src/common/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EatingSchedule, Student])],
  controllers: [EatingScheduleController],
  providers: [EatingScheduleService],
})
export class EatingScheduleModule {}
