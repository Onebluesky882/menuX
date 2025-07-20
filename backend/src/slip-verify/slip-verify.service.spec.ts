import { Test, TestingModule } from '@nestjs/testing';
import { SlipVerifyService } from './slip-verify.service';

describe('SlipVerifyService', () => {
  let service: SlipVerifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlipVerifyService],
    }).compile();

    service = module.get<SlipVerifyService>(SlipVerifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
