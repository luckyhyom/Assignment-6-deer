import { Test, TestingModule } from '@nestjs/testing';
import { RentalPayService } from './rentalPay.service';

describe('RentalPayService', () => {
  let service: RentalPayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentalPayService],
    }).compile();

    service = module.get<RentalPayService>(RentalPayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
