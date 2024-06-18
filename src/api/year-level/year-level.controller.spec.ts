import { Test, TestingModule } from '@nestjs/testing';
import { YearLevelController } from './year-level.controller';
import { YearLevelService } from './year-level.service';

describe('YearLevelController', () => {
  let controller: YearLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YearLevelController],
      providers: [YearLevelService],
    }).compile();

    controller = module.get<YearLevelController>(YearLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
