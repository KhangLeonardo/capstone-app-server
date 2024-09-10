import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EatingSchedule } from '../../common/entities/eating-schedule.entity';
import { scheduled } from 'rxjs';
import { Student } from 'src/common/entities/student.entity';

@Injectable()
export class EatingScheduleService {
  constructor(
    @InjectRepository(EatingSchedule)
    private eatingScheduleRepository: Repository<EatingSchedule>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>
  ) {}
  
  async findStudentByUser(userId: number): Promise<Student[]> {
    return this.studentRepository
      .createQueryBuilder('student')
      .where('student.parent_id = :userId', { userId })
      .select(['student.id', 'student.name'])
      .getMany();
  }


  async findByDateRange(
    studentId: number,
    startDate: string,
    endDate: string,
  ): Promise<any[]> {
    const rawResult = await this.eatingScheduleRepository.query(
      `
      SELECT schedule.*, class.name as class_name,location.name as location_name,media.url  
      FROM eating_schedules schedule
      JOIN classes class  ON schedule.class_id = class.id
      JOIN class_students cs  ON cs.class_id = class.id
      JOIN students student ON cs.student_id = student.id
      JOIN locations location ON schedule.location_id = location.id
      LEFT JOIN meal_media ON meal_media.meal_id = schedule.id  
      LEFT JOIN media ON media.id = meal_media.media_id          
      WHERE schedule.start_time >= $1
      AND schedule.end_time <= $2
      AND student.id = $3;
      `
      ,
      [startDate, endDate, studentId]
    );
  
    // Group media URLs by eating schedule ID
    return this.reformatResult(rawResult);
  }
  

  private reformatResult(rawResult: any[]): any[] {
    const scheduleMap = new Map();
    rawResult.forEach(row => {
      const scheduleId = row.id;
      if (!scheduleMap.has(scheduleId)) {
        scheduleMap.set(scheduleId, {
          scheduleId: row.id,
          classId: row.class_id,
          className: row.class_name,
          locationId: row.location_id,
          locationName: row.location_name,
          startTime: row.start_time,
          endTime: row.end_time,
          meal: row.meal,
          menu: Array.isArray(row.menu) ? row.menu : this.parseStringToArray(row.menu),
          nutrition: Array.isArray(row.nutrition) ? row.nutrition : this.parseStringToArray(row.nutrition),
          studentId: row.student_id,
          mediaUrls: [],
        })
      }
      if (row.url) {
        scheduleMap.get(scheduleId).mediaUrls.push(row.url);
      }
    });
    return Array.from(scheduleMap.values());
  }


  private parseStringToArray(value: string): string[] {
    try {
      return JSON.parse(value.replace(/'/g, '"'));
    } catch (error) {
      return [value];
    }
  }
}
