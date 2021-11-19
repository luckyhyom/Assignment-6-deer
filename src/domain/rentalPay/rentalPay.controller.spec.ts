import { Test, TestingModule } from '@nestjs/testing';
import { RentalPayController } from './rentalPay.controller';

describe('RentalPayController', () => {
  let controller: RentalPayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentalPayController],
    }).compile();

    controller = module.get<RentalPayController>(RentalPayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
