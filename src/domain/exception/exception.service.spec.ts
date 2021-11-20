import { Test, TestingModule } from '@nestjs/testing';
import { ExcepService } from './exception.service';

describe('ExcepService', () => {
  let service: ExcepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExcepService],
    }).compile();

    service = module.get<ExcepService>(ExcepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
