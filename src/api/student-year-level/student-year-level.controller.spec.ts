import { Test, TestingModule } from '@nestjs/testing';
import { StudentYearLevelController } from './student-year-level.controller';
import { StudentYearLevelService } from './student-year-level.service';

describe('StudentYearLevelController', () => {
  let controller: StudentYearLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentYearLevelController],
      providers: [StudentYearLevelService],
    }).compile();

    controller = module.get<StudentYearLevelController>(StudentYearLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
