import { Module } from '@nestjs/common';
import { StudentParentService } from './student-parent.service';
import { StudentParentController } from './student-parent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentParent } from '../../common/entities/student-parent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentParent])],
  controllers: [StudentParentController],
  providers: [StudentParentService],
})
export class StudentParentModule {}
