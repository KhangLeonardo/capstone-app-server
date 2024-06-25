import { Module } from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { AbsenceController } from './absence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Absence } from '../../common/entities/absence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Absence])],
  controllers: [AbsenceController],
  providers: [AbsenceService],
})
export class AbsenceModule {}
