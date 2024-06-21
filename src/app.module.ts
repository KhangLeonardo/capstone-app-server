import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { PostgresModule } from './providers/database/postgres/postgres.module';
import { RedisModule } from './providers/cache/redis/redis.module';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { PostModule } from './api/post/post.module';
import { StudentModule } from './api/student/student.module';
import { ParentModule } from './api/parent/parent.module';
import { StudentParentModule } from './api/student-parent/student-parent.module';
import { SchoolYearModule } from './api/school-year/school-year.module';
import { TermModule } from './api/term/term.module';
import { YearLevelModule } from './api/year-level/year-level.module';
import { StudentYearLevelModule } from './api/student-year-level/student-year-level.module';
import { TeacherModule } from './api/teacher/teacher.module';
import { ClassModule } from './api/class/class.module';
import { ClassroomModule } from './api/classroom/classroom.module';
import { ClassroomTypeModule } from './api/classroom-type/classroom-type.module';
import { SubjectModule } from './api/subject/subject.module';
import { StudentClassModule } from './api/student-class/student-class.module';
import { MenuModule } from './api/menu/menu.module';
import { MenuCategoryModule } from './api/menu-category/menu-category.module';
import { MealModule } from './api/meal/meal.module';
import { AttendanceModule } from './api/attendance/attendance.module';
import { EventModule } from './api/event/event.module';
import { DailyScheduleModule } from './api/daily-schedule/daily-schedule.module';
import { AbsenceModule } from './api/absence/absence.module';
import { PeriodModule } from './api/period/period.module';
import { NotificationModule } from './api/notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    PostgresModule,
    UserModule,
    AuthModule,
    RedisModule,
    PostModule,
    StudentModule,
    ParentModule,
    StudentParentModule,
    SchoolYearModule,
    TermModule,
    YearLevelModule,
    StudentYearLevelModule,
    TeacherModule,
    ClassModule,
    ClassroomModule,
    ClassroomTypeModule,
    SubjectModule,
    StudentClassModule,
    MenuModule,
    MenuCategoryModule,
    MealModule,
    AttendanceModule,
    EventModule,
    DailyScheduleModule,
    AbsenceModule,
    PeriodModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
