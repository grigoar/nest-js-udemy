import { Test, TestingModule } from '@nestjs/testing';
import { CoputerController } from './coputer.controller';

describe('CoputerController', () => {
  let controller: CoputerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoputerController],
    }).compile();

    controller = module.get<CoputerController>(CoputerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
