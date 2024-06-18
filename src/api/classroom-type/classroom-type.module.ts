import { Module } from '@nestjs/common';
import { ClassroomTypeService } from './classroom-type.service';
import { ClassroomTypeController } from './classroom-type.controller';

@Module({
  controllers: [ClassroomTypeController],
  providers: [ClassroomTypeService],
})
export class ClassroomTypeModule {}
