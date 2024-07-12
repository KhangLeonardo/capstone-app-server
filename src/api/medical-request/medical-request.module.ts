import { Module } from '@nestjs/common';
import { MedicalRequestController } from './medical-request.controller';
import { MedicalRequestService } from './medical-request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalRequest } from 'src/common/entities/medical-request.entity';
import { Student } from 'src/common/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalRequest, Student])],
  controllers: [MedicalRequestController],
  providers: [MedicalRequestService]
})
export class MedicalRequestModule {}
