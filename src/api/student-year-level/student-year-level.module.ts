import { Module } from '@nestjs/common';
import { StudentYearLevelService } from './student-year-level.service';
import { StudentYearLevelController } from './student-year-level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentYearLevel } from '../../common/entities/student-year-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentYearLevel])],
  controllers: [StudentYearLevelController],
  providers: [StudentYearLevelService],
})
export class StudentYearLevelModule {}
