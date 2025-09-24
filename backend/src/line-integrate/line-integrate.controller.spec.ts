import { Test, TestingModule } from '@nestjs/testing';
import { LineIntegrateController } from './line-integrate.controller';

describe('LineIntegrateController', () => {
  let controller: LineIntegrateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LineIntegrateController],
    }).compile();

    controller = module.get<LineIntegrateController>(LineIntegrateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
