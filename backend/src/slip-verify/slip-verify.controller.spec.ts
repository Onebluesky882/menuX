import { Test, TestingModule } from '@nestjs/testing';
import { SlipVerifyController } from './slip-verify.controller';

describe('SlipVerifyController', () => {
  let controller: SlipVerifyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlipVerifyController],
    }).compile();

    controller = module.get<SlipVerifyController>(SlipVerifyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
