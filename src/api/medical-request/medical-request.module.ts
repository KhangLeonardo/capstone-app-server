import { Module } from '@nestjs/common';
import { MedicalRequestController } from './medical-request.controller';
import { MedicalRequestService } from './medical-request.service';

@Module({
  controllers: [MedicalRequestController],
  providers: [MedicalRequestService]
})
export class MedicalRequestModule {}
