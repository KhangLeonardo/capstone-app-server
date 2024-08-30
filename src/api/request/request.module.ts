import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from 'src/common/entities/request.entity';
import { User } from 'src/decorator/customize';
import { Role } from 'src/common/entities/role.entity';
import { UserSession } from 'src/common/entities/user-session.entity';
import { DeviceToken } from 'src/common/entities/device-token.entity';
import { Student } from 'src/common/entities/student.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/common/guards/jwt.strategy';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { ClassStudent } from 'src/common/entities/class-student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Request,
    User, 
    Role,
    UserSession,
    DeviceToken,
    Student,
    ClassStudent
  ]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'),
      }
        })
  }),
  ConfigModule,
  AuthModule
],
  providers: [RequestService],
  controllers: [RequestController]
})
export class RequestModule {}
