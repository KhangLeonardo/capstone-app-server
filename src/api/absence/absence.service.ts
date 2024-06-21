import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Absence } from '../../common/entities/absence.entity';
import { CreateAbsenceDto, UpdateAbsenceDto } from './dto/create-absence.dto';

@Injectable()
export class AbsenceService {
  constructor(
    @InjectRepository(Absence)
    private absenceRepository: Repository<Absence>,
  ) {}

  create(createAbsenceDto: CreateAbsenceDto) {
    const absence = this.absenceRepository.create(createAbsenceDto);
    return this.absenceRepository.save(absence);
  }

  findAll() {
    return this.absenceRepository.find();
  }

  findOne(id: number) {
    return this.absenceRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateAbsenceDto: UpdateAbsenceDto) {
    return this.absenceRepository.update(id, updateAbsenceDto);
  }

  remove(id: number) {
    return this.absenceRepository.delete(id);
  }
}
