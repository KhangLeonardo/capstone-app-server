import { Injectable } from '@nestjs/common';
import { Subject } from '../../common/entities/subject.entity';
import { SchoolYear } from '../../common/entities/school-year.entity';
import { Teacher } from '../../common/entities/teacher.entity';
import { DataSource } from 'typeorm';
import { Term } from '../../common/entities/term.entity';
import { ClassroomType } from '../../common/entities/classroom-types.entity';
import { Classroom } from '../../common/entities/classroom.entity';
import { Class } from '../../common/entities/class.entity';
import { Student } from '../../common/entities/student.entity';
import { Parent } from '../../common/entities/parent.entity';
import { StudentParent } from '../../common/entities/student-parent.entity';
import { StudentClass } from '../../common/entities/student-class.entity';
import { DailySchedule } from '../../common/entities/daily-schedule.entity';
import { DayOfWeek } from '../../common/enum/day_of_week.enum';
import { Attendance } from '../../common/entities/attendance.entity';
import { Status } from '../../common/enum/status_t.enum';
import { MenuCategory } from '../../common/entities/menu-category.entity';
import { Menu } from '../../common/entities/menu.entity';
import { Meal } from '../../common/entities/meal.entity';
import { Event } from '../../common/entities/event.entity';
import { Absence } from '../../common/entities/absence.entity';
import { User } from '../../common/entities/user.entity';
import { Role } from '../../common/entities/role.entity';
import { Post } from '../../common/entities/post.entity';
import { Hashtag } from '../../common/entities/hashtag.entity';
import { Image } from '../../common/entities/image.entity';
import { Comment } from '../../common/entities/comment.entity';
import { PostHashtag } from '../../common/entities/post-hashtag.entity';
import { Gender } from 'src/common/enum/gender_t.enum';
import { School } from 'src/common/entities/school.entity';

@Injectable()
export class SeedingService {
  constructor(private readonly dataSource: DataSource) {}
  async seed() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // seeder gose here nhe :)
      const teacher = new Teacher();
      teacher.full_name = 'John Doe';
      teacher.first_name = 'John';
      teacher.gender = Gender.Male;
      teacher.last_name = 'Doe';
      teacher.date_of_birth = new Date('1980-01-01');
      await queryRunner.manager.save(teacher);

      const subject = new Subject();
      subject.subject_name = 'Mathematics';
      await queryRunner.manager.save(subject);

      const schoolYear = new SchoolYear();
      schoolYear.year = '2023';
      schoolYear.start_date = new Date('2023-01-01');
      schoolYear.end_date = new Date('2023-12-31');
      await queryRunner.manager.save(schoolYear);

      const term = new Term();
      term.start_date = new Date('2023-01-01');
      term.end_date = new Date('2023-06-30');
      term.term_number = 1;
      term.schoolYear = schoolYear;
      await queryRunner.manager.save(term);

      const classroomType = new ClassroomType();
      classroomType.name = 'Laboratory';
      await queryRunner.manager.save(classroomType);

      const classroom = new Classroom();
      classroom.period = new Date('2023-01-01');
      classroom.summary = 'Laboratory 1';
      classroom.location = 'Building A';
      classroom.classroomType = classroomType;
      await queryRunner.manager.save(classroom);

      const classEntity = new Class();
      classEntity.name = 'Math 101';
      classEntity.start_time = new Date('2023-01-10T08:00:00Z');
      classEntity.end_time = new Date('2023-01-10T10:00:00Z');
      classEntity.teacher = teacher;
      classEntity.term = term;
      classEntity.classroom = classroom;
      classEntity.subject = subject;
      await queryRunner.manager.save(classEntity);

      const student = new Student();
      student.full_name = 'Alice Smith';
      student.first_name = 'Alice';
      student.last_name = 'Smith';
      student.gender = Gender.Female;
      student.school_id = 1;
      student.date_of_birth = new Date('2005-01-01');
      await queryRunner.manager.save(student);

      const parent = new Parent();
      parent.full_name = 'Bob Smith';
      parent.first_name = 'Bob';
      parent.last_name = 'Smith';
      parent.email = 'bob.smith@example.com';
      parent.phone_number = '123-456-7890';
      await queryRunner.manager.save(parent);

      const studentParent = new StudentParent();
      studentParent.student = student;
      studentParent.parent = parent;
      await queryRunner.manager.save(studentParent);

      const studentClass = new StudentClass();
      studentClass.student = student;
      studentClass.classEntity = classEntity;
      studentClass.score = 95;
      await queryRunner.manager.save(studentClass);

      const dailySchedule = new DailySchedule();
      dailySchedule.day_of_week = DayOfWeek.Monday;
      dailySchedule.start_time = new Date('2023-01-10T08:00:00Z');
      dailySchedule.end_time = new Date('2023-01-10T10:00:00Z');
      dailySchedule.classEntity = classEntity;
      await queryRunner.manager.save(dailySchedule);

      const attendance = new Attendance();
      attendance.date = new Date('2023-01-10');
      attendance.status = Status.Present;
      attendance.student = student;
      attendance.class = classEntity;
      await queryRunner.manager.save(attendance);

      const menuCategory = new MenuCategory();
      menuCategory.name = 'Breakfast';
      await queryRunner.manager.save(menuCategory);

      const menu = new Menu();
      menu.name = 'Breakfast Menu';
      menu.time_range = '07:00-09:00';
      menu.start_time = new Date('2023-01-10T07:00:00Z');
      menu.end_time = new Date('2023-01-10T09:00:00Z');
      menu.menuCategory = menuCategory;
      await queryRunner.manager.save(menu);

      const meal = new Meal();
      meal.name = 'Pancakes';
      meal.description = 'Delicious pancakes with syrup';
      meal.nutrition_info = 'Calories: 300';
      meal.menu = menu;
      await queryRunner.manager.save(meal);

      const event = new Event();
      event.name = 'Math Competition';
      event.start_date = new Date('2023-02-15');
      event.end_date = new Date('2023-02-15');
      await queryRunner.manager.save(event);

      const absence = new Absence();
      absence.reason = 'Sick';
      await queryRunner.manager.save(absence);

      const role = new Role();
      role.name = 'Admin';
      await queryRunner.manager.save(role);

      const user = new User();
      user.name = 'admin';
      user.email = 'admin@example.com';
      user.password = 'password'; // Ensure to hash the password in real applications
      user.phone = '555-555-5555';
      user.role = role;
      await queryRunner.manager.save(user);

      const school = new School();
      school.name = 'School 1';
      await queryRunner.manager.save(school);

      const post = new Post();
      post.title = 'First Post';
      post.content = 'This is the content of the first post.';
      post.user = user;
      post.school = school;
      post.status = 'published';
      await queryRunner.manager.save(post);

      const hashtag = new Hashtag();
      hashtag.tag = 'Education';
      await queryRunner.manager.save(hashtag);

      const image = new Image();
      image.url = 'http://example.com/image.jpg';
      image.post = post;
      await queryRunner.manager.save(image);

      const comment = new Comment();
      comment.content = 'Great post!';
      comment.post = post;
      comment.user = user;
      await queryRunner.manager.save(comment);

      const postHashtag = new PostHashtag();
      postHashtag.post = post;
      postHashtag.hashtag = hashtag;
      postHashtag.placeholderNumber = 1;
      await queryRunner.manager.save(postHashtag);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction;
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
