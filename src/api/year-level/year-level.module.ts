import { Module } from '@nestjs/common';
import { YearLevelService } from './year-level.service';
import { YearLevelController } from './year-level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YearLevel } from '../../common/entities/year-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([YearLevel])],
  controllers: [YearLevelController],
  providers: [YearLevelService],
})
export class YearLevelModule {}
