import { Test, TestingModule } from '@nestjs/testing';
import { YearLevelService } from './year-level.service';

describe('YearLevelService', () => {
  let service: YearLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YearLevelService],
    }).compile();

    service = module.get<YearLevelService>(YearLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
