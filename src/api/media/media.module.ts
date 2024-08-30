import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../../common/guards/jwt.strategy';
import { AuthService } from '../auth/auth.service';

import { StudentMedia } from '../../common/entities/student-media.entity';
import { Student } from '../../common/entities/student.entity';
import { Media } from '../../common/entities/media.entity';
import { User } from '../../common/entities/user.entity';
import { Role } from '../../common/entities/role.entity';
import { UserSession } from '../../common/entities/user-session.entity';
import { DeviceToken } from '../../common/entities/device-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentMedia, Media, User, Role, UserSession, DeviceToken, Student]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'),
      },
    }),
  }),
  ],
  controllers: [MediaController],
  providers: [MediaService, JwtStrategy, AuthService],
})
export class MediaModule { }
