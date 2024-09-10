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

  // async findScheduleByStudent(
  //   userId: number,
  //   studentId: number,
  //   startDate: string,
  //   endDate: string
  // ): Promise<DailySchedule[]> {
  //   return this.dailyScheduleRepository
  //     .createQueryBuilder('schedule')
  //     .innerJoin(
  //       ClassStudent,
  //       'classStudent',
  //       'classStudent.class_id = schedule.class_id',
  //     )
  //     .innerJoin(Student, 'student','student.id = classStudent.student_id')
  //     .where('student.parent_id = :userId', { userId })
  //     .andWhere('student.id = :studentId', {studentId})
  //     .andWhere('schedule.start_time >= :startDate', {startDate})
  //     .andWhere('schedule.end_time <= :endDate', {endDate})
  //     .select([
  //       'schedule.id',
  //       'schedule.class_id',
  //       'schedule.start_time',
  //       'schedule.end_time',
  //       'schedule.subject'
  //     ])
  //     .getMany();
  // }

  async findScheduleById(

    studentId: number,
    startDate: string,
    endDate: string,
  ): Promise<any[]> {
    const schedules = await this.dailyScheduleRepository.query(
      `
      SELECT 
      schedule.id ,
      schedule.class_id ,
      schedule.start_time ,
      schedule.end_time,
      subjects.id AS subject_id,
      subjects.name AS subject_name,
      teachers.id as teacher_id,
      teachers.name as teacher_name,
      teachers.contact_number as contact_number
    FROM daily_schedules schedule
    INNER JOIN classes ON schedule.class_id = classes.id
    INNER JOIN class_students cs ON cs.class_id = classes.id
    INNER JOIN students student ON cs.student_id = student.id
    LEFT JOIN subjects ON schedule.subject_id = subjects.id  
    LEFT JOIN teachers ON classes.teacher_id = teachers.id
    WHERE student.id = $1
    AND schedule.start_time >= $2
    AND schedule.end_time <= $3
      `, 
      [studentId,startDate, endDate]
    );
    console.log(schedules);
      if (!schedules || schedules.length === 0) {
        throw new NotFoundException('Schedule not found');
      }
      return schedules.map((result: any) => ({
        scheduleId: result.schedule_id,
        classId: result.class_id,
        startTime: result.start_time,
        endTime: result.end_time,
        subjectId: result.subject_id,
        subjectName: result.subject_name,
        teacherId: result.teacher_id,
        teacherName: result.teacher_name,
        teacherContactNumber: result.contact_number
      }));
  }


}
