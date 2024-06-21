import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendace.dto';
import { UpdateAttendaceDto } from './dto/update-attendace.dto';

@Injectable()
export class AttendaceService {
  create(createAttendaceDto: CreateAttendanceDto) {
    return 'This action adds a new attendace';
  }

  findAll() {
    return `This action returns all attendace`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attendace`;
  }

  update(id: number, updateAttendaceDto: UpdateAttendaceDto) {
    return `This action updates a #${id} attendace`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendace`;
  }
}
