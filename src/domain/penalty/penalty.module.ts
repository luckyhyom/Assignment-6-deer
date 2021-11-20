import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentalPayModule } from "../rentalPay/rentalPay.module";
import { PenaltyRepository } from "./penalty.repository";
import { PenaltyService } from "./penalty.service";

@Module({
	imports: [TypeOrmModule.forFeature([PenaltyRepository]), RentalPayModule],
	exports: [],
	providers: [PenaltyService]
})
export class PenaltyModule {}
