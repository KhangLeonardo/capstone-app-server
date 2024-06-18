import { Test, TestingModule } from '@nestjs/testing';
import { DailyScheduleController } from './daily-schedule.controller';
import { DailyScheduleService } from './daily-schedule.service';

describe('DailyScheduleController', () => {
  let controller: DailyScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyScheduleController],
      providers: [DailyScheduleService],
    }).compile();

    controller = module.get<DailyScheduleController>(DailyScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
