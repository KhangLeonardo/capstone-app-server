import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { PushNotificationDto } from './dto/notification.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('push')
  async sendPushNotification(@Body() payload: PushNotificationDto) {
    const userId = 3;
    const deviceTokens =
      await this.notificationService.getUserDeviceTokens(userId);

    if (deviceTokens.length === 0) {
      throw new Error('No device tokens available to send the notification.');
    }

    await this.notificationService.sendPushNotification(deviceTokens, payload);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUserNotifications(@Req() request: any) {
    const user = request.user;
    const parentId = user.id;
    const notifications = await this.notificationService.getUserNotifications(parentId);
    if (notifications.length === 0) {
      throw new Error('No notifications found for this user.');
    }
    return notifications;
  }
}
