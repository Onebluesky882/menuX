import { Test, TestingModule } from '@nestjs/testing';
import { LineIntegrateService } from './line-integrate.service';

describe('LineIntegrateService', () => {
  let service: LineIntegrateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LineIntegrateService],
    }).compile();

    service = module.get<LineIntegrateService>(LineIntegrateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
