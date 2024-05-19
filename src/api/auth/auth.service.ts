import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomInt } from 'crypto';

import { User } from '../../common/entities/user.entity';
import { Role } from '../../common/entities/role.entity';
import { UserSession } from '../../common/entities/user-session.entity';
import { DeviceToken } from '../../common/entities/device-token.entity';

import { CreateAuthDto } from './dto/create-auth.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

import { JwtService } from '@nestjs/jwt';
import { Cache } from '@nestjs/cache-manager';

import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserSession)
    private readonly userSessionRepository: Repository<UserSession>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(DeviceToken)
    private readonly deviceTokenRepository: Repository<DeviceToken>,
    private readonly jwtService: JwtService,
    private readonly cacheService: Cache,
  ) {}

  async sendOtp(
    createAuthDto: CreateAuthDto,
  ): Promise<{ status: string; message: string }> {
    const { phone } = createAuthDto;
    this.validatePhone(phone);

    const user = await this.userRepository.findOne({ where: { phone } });
    this.validateUserExistence(user);

    const otp = this.generateOtp();
    await this.cacheService.set(phone, otp, 30);

    return { status: 'success', message: `OTP: ${otp}` };
  }

  async verifyOtp(
    verifyOtpDto: VerifyOtpDto,
    deviceToken: string,
    deviceType: string,
  ): Promise<{ status: string; message: string; accessToken?: string }> {
    const { phone, otp } = verifyOtpDto;
    this.validatePhone(phone);
    this.validateOtp(otp);

    if (!deviceToken) {
      throw new BadRequestException('Device token is required');
    }

    const user = await this.userRepository.findOne({
      where: { phone },
      relations: ['role'],
    });
    this.validateUserExistence(user);

    const storedOtp = await this.cacheService.get<string>(phone);
    this.validateOtpMatch(storedOtp, otp);

    await this.cacheService.del(phone);

    const accessToken = this.generateAccessToken(user);
    await this.saveUserSession(user, accessToken);
    await this.saveDeviceToken(user, deviceToken, deviceType);

    return { status: 'success', message: 'Mã OTP hợp lệ', accessToken };
  }

  async getProfile(userId: number): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['students'],
    });
    this.validateUserExistence(user);
    return user;
  }

  public decodeToken(token: string): { userId: number } | null {
    try {
      return this.jwtService.decode(token) as { userId: number };
    } catch (error) {
      return null;
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: payload.userId },
    });
    this.validateUserExistence(user);
    return user;
  }

  async findRoleNameById(id: number): Promise<string | null> {
    const role = await this.roleRepository.findOne({ where: { id } });
    return role ? role.name : null;
  }

  private validatePhone(phone: string): void {
    if (!phone) {
      throw new BadRequestException('Số điện thoại là bắt buộc');
    }
  }

  private validateUserExistence(user: User): void {
    if (!user) {
      throw new BadRequestException(
        'Số điện thoại không hợp lệ hoặc người dùng không tồn tại',
      );
    }
  }

  private generateOtp(): string {
    return randomInt(100000, 999999).toString();
  }

  private validateOtp(otp: string): void {
    if (!otp) {
      throw new BadRequestException('Mã OTP là bắt buộc');
    }
  }

  private validateOtpMatch(storedOtp: string, otp: string): void {
    if (storedOtp !== otp) {
      throw new BadRequestException('Mã OTP không hợp lệ');
    }
  }

  private generateAccessToken(user: User): string {
    const accessTokenPayload: JwtPayload = {
      userId: user.id,
      roleId: user.role.id,
      issuedAt: new Date().toISOString(),
      expiresAt: new Date(
        Date.now() + 4 * 30 * 24 * 60 * 60 * 1000,
      ).toISOString(), // 4 months
    };
    return this.jwtService.sign(accessTokenPayload);
  }

  private async saveUserSession(
    user: User,
    accessToken: string,
  ): Promise<void> {
    const userSession = new UserSession();
    userSession.access_token = accessToken;
    userSession.user = user;
    userSession.access_token_expiration_time = new Date(
      Date.now() + 4 * 30 * 24 * 60 * 60 * 1000,
    );
    await this.userSessionRepository.save(userSession);
  }

  private async saveDeviceToken(
    user: User,
    deviceToken: string,
    deviceType: string,
  ): Promise<void> {
    if (deviceToken && deviceType) {
      const tokenEntity = new DeviceToken();
      tokenEntity.token = deviceToken;
      tokenEntity.device_type = deviceType;
      tokenEntity.user = user;
      await this.deviceTokenRepository.save(tokenEntity);
    }
  }

  private extractUserIdFromToken(authHeader: string): number {
    const accessToken = authHeader?.split(' ')[1];
    const decodedToken = this.jwtService.decode(accessToken) as {
      userId: number;
    };
    return decodedToken?.userId;
  }

  private validateUserId(userId: number): void {
    if (!userId) {
      throw new BadRequestException('Token không hợp lệ hoặc đã hết hạn');
    }
  }
}
