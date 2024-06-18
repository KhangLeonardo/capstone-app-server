import { Test, TestingModule } from '@nestjs/testing';
import { ClassroomTypeService } from './classroom-type.service';

describe('ClassroomTypeService', () => {
  let service: ClassroomTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassroomTypeService],
    }).compile();

    service = module.get<ClassroomTypeService>(ClassroomTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
