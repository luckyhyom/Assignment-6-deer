import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaRepository } from '../rentalPay/area.repository';
import { CalculatorService } from './calculator.service';

@Module({
  imports: [TypeOrmModule.forFeature([AreaRepository])],
  providers: [CalculatorService],
  exports: [CalculatorService]
})
export class CalculatorModule {}
