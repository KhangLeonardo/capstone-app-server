import { Module } from '@nestjs/common';
import { StudentParentService } from './student-parent.service';
import { StudentParentController } from './student-parent.controller';

@Module({
  controllers: [StudentParentController],
  providers: [StudentParentService],
})
export class StudentParentModule {}
