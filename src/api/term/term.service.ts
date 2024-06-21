import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Term } from '../../common/entities/term.entity';
import { CreateTermDto, UpdateTermDto } from './dto/create-term.dto';

@Injectable()
export class TermService {
  constructor(
    @InjectRepository(Term)
    private termRepository: Repository<Term>,
  ) {}

  create(createTermDto: CreateTermDto) {
    const term = this.termRepository.create(createTermDto);
    return this.termRepository.save(term);
  }

  findAll() {
    return this.termRepository.find();
  }

  findOne(id: number) {
    return this.termRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateTermDto: UpdateTermDto) {
    return this.termRepository.update(id, updateTermDto);
  }

  remove(id: number) {
    return this.termRepository.delete(id);
  }
}
