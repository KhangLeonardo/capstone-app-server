import { Module } from '@nestjs/common';
import { StudentYearLevelService } from './student-year-level.service';
import { StudentYearLevelController } from './student-year-level.controller';

@Module({
  controllers: [StudentYearLevelController],
  providers: [StudentYearLevelService],
})
export class StudentYearLevelModule {}
