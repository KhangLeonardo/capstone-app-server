import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parent } from '../../common/entities/parent.entity';
import { CreateParentDto, UpdateParentDto } from './dto/create-parent.dto';

@Injectable()
export class ParentService {
  constructor(
    @InjectRepository(Parent)
    private parentRepository: Repository<Parent>,
  ) {}

  create(createParentDto: CreateParentDto) {
    const parent = this.parentRepository.create(createParentDto);
    return this.parentRepository.save(parent);
  }

  findAll() {
    return this.parentRepository.find();
  }

  findOne(id: number) {
    return this.parentRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateParentDto: UpdateParentDto) {
    return this.parentRepository.update(id, updateParentDto);
  }

  remove(id: number) {
    return this.parentRepository.delete(id);
  }
}
