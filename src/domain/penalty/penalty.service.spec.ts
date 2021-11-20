import { Test, TestingModule } from '@nestjs/testing';
import { PenaltyService } from './penalty.service';

describe('PenaltyService', () => {
  let service: PenaltyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PenaltyService],
    }).compile();

    service = module.get<PenaltyService>(PenaltyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
