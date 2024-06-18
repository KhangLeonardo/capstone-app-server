import { Test, TestingModule } from '@nestjs/testing';
import { StudentParentController } from './student-parent.controller';
import { StudentParentService } from './student-parent.service';

describe('StudentParentController', () => {
  let controller: StudentParentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentParentController],
      providers: [StudentParentService],
    }).compile();

    controller = module.get<StudentParentController>(StudentParentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
