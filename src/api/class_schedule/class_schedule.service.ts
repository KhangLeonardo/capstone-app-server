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

  async findScheduleById(scheduleId: number): Promise<any> {
    const schedule = await this.dailyScheduleRepository.query(
      `
        SELECT 
          schedule.id as scheduleId,
          schedule.class_id as classId,
          schedule.start_time as startTime,
          schedule.end_time as endTime,
          subjects.id AS subjectId,
          subjects.name AS subjectName,
          teachers.id as teacherId,
          teachers.name as teacherName,
          teachers.contact_number as teacherContactNumber
        FROM daily_schedules schedule
        LEFT JOIN classes ON schedule.class_id = classes.id
        LEFT JOIN subjects ON schedule.subject_id = subjects.id  
        LEFT JOIN teachers ON classes.teacher_id = teachers.id
        WHERE schedule.id = $1
      `, 
      [scheduleId]
    );

      if (!schedule || schedule.length === 0) {
        throw new NotFoundException('Schedule not found');
      }
      const result = schedule[0];
      const formattedResult = {
        scheduleId: result.scheduleid,
        classId: result.classid,
        startTime: result.starttime,
        endTime: result.endtime,
        subjectId: result.subjectid,
        subjectName: result.subjectname,
        teacherId: result.teacherid,
        teacherName: result.teachername,
        teacherContactNumber: result.teachercontactnumber
      };
      return formattedResult;
  }


}
