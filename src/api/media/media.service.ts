import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { StudentMedia } from '../../common/entities/student-media.entity';
import { Student } from '../../common/entities/student.entity';
import { Media } from '../../common/entities/media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(StudentMedia)
    private readonly studentMediaRepository: Repository<StudentMedia>,
  ) {}

  async findAll(userId: number): Promise<Media[]> {
    // Step 1: Fetch all students where the parent_id matches the userId
    const students = await this.studentRepository.find({
      where: { parent_id: userId },
    });

    if (students.length === 0) {
      return []; // No students found, return an empty array
    }

    // Step 2: Get all student IDs
    const studentIds = students.map(student => student.id);

    // Step 3: Fetch all media associated with these student IDs via StudentMedia
    const studentMedia = await this.studentMediaRepository.find({
      where: { student_id: In(studentIds) },
      relations: ['media'], // Load the related Media entity
    });

    // Step 4: Extract the media from the StudentMedia entities
    const media = studentMedia.map(sm => sm.media);

    return media;
  }
}
