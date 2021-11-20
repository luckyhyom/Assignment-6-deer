import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ParkingZoneRepository } from "../rentalPay/parkingZone.repository";
import { UseKickboardHistoryRepository } from "../rentalPay/useKickboardHistory.repository";
import { DiscountRepository } from "./discount.repository";
import { DiscountService } from "./discount.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			DiscountRepository,
			UseKickboardHistoryRepository,
			ParkingZoneRepository
		])
	],
	providers: [DiscountService],
	exports: [DiscountService]
})
export class DiscountModule {}
