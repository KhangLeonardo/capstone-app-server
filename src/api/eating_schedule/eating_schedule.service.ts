import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EatingSchedule } from '../../common/entities/eating-schedule.entity';
import { scheduled } from 'rxjs';

@Injectable()
export class EatingScheduleService {
  constructor(
    @InjectRepository(EatingSchedule)
    private eatingScheduleRepository: Repository<EatingSchedule>,
  ) {}

  async findByDateRange(
    studentId: number,
    startDate: string,
    endDate: string,
  ): Promise<any[]> {
    const rawResult = await this.eatingScheduleRepository.query(
      `
      SELECT schedule.*, media.url  
      FROM eating_schedules schedule
      JOIN classes class  ON schedule.class_id = class.id
      JOIN class_students cs  ON cs.class_id = class.id
      JOIN students student ON cs.student_id = student.id
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
          startTime: row.start_time,
          endTime: row.end_time,
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
}
