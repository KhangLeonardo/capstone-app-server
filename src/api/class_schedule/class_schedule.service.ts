import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailySchedule } from '../../common/entities/daily-schedule.entity';
import { Student } from '../../common/entities/student.entity';
import { ClassStudent } from '../../common/entities/class-student.entity';

@Injectable()
export class ClassScheduleService {
  constructor(
    @InjectRepository(DailySchedule)
    private dailyScheduleRepository: Repository<DailySchedule>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(ClassStudent)
    private classStudentRepository: Repository<ClassStudent>,
  ) {}

  

  async findStudentByUser(userId: number): Promise<Student[]> {
    return this.studentRepository
      .createQueryBuilder('student')
      .where('student.parent_id = :userId', { userId })
      .select(['student.id', 'student.name'])
      .getMany();
  }

  async findScheduleByStudent(
    userId: number,
    studentId: number,
    startDate: string,
    endDate: string
  ): Promise<DailySchedule[]> {
    return this.dailyScheduleRepository
      .createQueryBuilder('schedule')
      .innerJoin(
        ClassStudent,
        'classStudent',
        'classStudent.class_id = schedule.class_id',
      )
      .innerJoin(Student, 'student','student.id = classStudent.student_id')
      .where('student.parent_id = :userId', { userId })
      .andWhere('student.id = :studentId', {studentId})
      .andWhere('schedule.start_time >= :startDate', {startDate})
      .andWhere('schedule.end_time <= :endDate', {endDate})
      .select([
        'schedule.id',
        'schedule.class_id',
        'schedule.start_time',
        'schedule.end_time',
        'schedule.subject'
      ])
      .getMany();
  }

  async findScheduleById(scheduleId: number): Promise<DailySchedule> {
    const schedule = await this.dailyScheduleRepository
      .createQueryBuilder('schedule')
      .leftJoinAndSelect('schedule.class', 'class')
      .leftJoinAndSelect('class.teacher', 'teacher')
      .where('schedule.id = :scheduleId', {scheduleId})
      .select([
        'schedule.id',
        'schedule.class_id',
        'schedule.start_time',
        'schedule.end_time',
        'schedule.subject',
        'teacher.id',
        'teacher.name',
        'teacher.contact_number'
      ])
      .getOne();
      if (!schedule) {
        throw new NotFoundException('Schedule not found');
      }
      return schedule;
  }


}
