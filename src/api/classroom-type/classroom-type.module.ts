import { Module } from '@nestjs/common';
import { ClassroomTypeService } from './classroom-type.service';
import { ClassroomTypeController } from './classroom-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassroomType } from '../../common/entities/classroom-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassroomType])],
  controllers: [ClassroomTypeController],
  providers: [ClassroomTypeService],
})
export class ClassroomTypeModule {}
