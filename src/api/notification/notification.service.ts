import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceToken } from '../../common/entities/device-token.entity';
import { Notification } from '../../common/entities/notification.entity';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(DeviceToken)
    private readonly deviceTokenRepository: Repository<DeviceToken>,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async getUserDeviceTokens(userId: number): Promise<string[]> {
    const tokens = await this.deviceTokenRepository
      .createQueryBuilder('deviceToken')
      .select('deviceToken.token')
      .where('deviceToken.user_id = :userId', { userId })
      .getMany();

    return tokens.map((token) => token.token);
  }

  // New method to get notifications based on user ID
  async getUserNotifications(userId: number): Promise<Notification[]> {
    return await this.notificationRepository
      .createQueryBuilder('notification')
      .where('notification.user_id = :userId', { userId })
      .orderBy('notification.created_at', 'DESC')
      .getMany();
  }

  // Existing method to send push notification
  async sendPushNotification(deviceTokens: string[], payload: any) {
    if (!deviceTokens || deviceTokens.length === 0) {
      console.error('No device tokens available to send the notification.');
      throw new Error('No device tokens available to send the notification.');
    }

    const dataPayload = {
      Nick: String(payload.nick),
      Room: String(payload.room),
    };

    const message: admin.messaging.MulticastMessage = {
      tokens: deviceTokens,
      notification: {
        title: payload.title,
        body: payload.body,
      },
      data: dataPayload,
      android: {},
      apns: {
        payload: {
          aps: {
            alert: {
              title: payload.title,
              body: payload.body,
            },
          },
        },
      },
    };

    try {
      const response = await admin.messaging().sendMulticast(message);
      console.log('Successfully sent message:', response);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
