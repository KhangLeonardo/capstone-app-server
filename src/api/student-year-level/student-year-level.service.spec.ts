import { Test, TestingModule } from '@nestjs/testing';
import { StudentYearLevelService } from './student-year-level.service';

describe('StudentYearLevelService', () => {
  let service: StudentYearLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentYearLevelService],
    }).compile();

    service = module.get<StudentYearLevelService>(StudentYearLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
