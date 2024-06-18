import { Module } from '@nestjs/common';
import { AttendaceService } from './attendace.service';
import { AttendaceController } from './attendace.controller';

@Module({
  controllers: [AttendaceController],
  providers: [AttendaceService],
})
export class AttendaceModule {}
