import { Module } from '@nestjs/common';
import { YearLevelService } from './year-level.service';
import { YearLevelController } from './year-level.controller';

@Module({
  controllers: [YearLevelController],
  providers: [YearLevelService],
})
export class YearLevelModule {}
