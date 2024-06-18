import { Test, TestingModule } from '@nestjs/testing';
import { ClassroomTypeController } from './classroom-type.controller';
import { ClassroomTypeService } from './classroom-type.service';

describe('ClassroomTypeController', () => {
  let controller: ClassroomTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassroomTypeController],
      providers: [ClassroomTypeService],
    }).compile();

    controller = module.get<ClassroomTypeController>(ClassroomTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
