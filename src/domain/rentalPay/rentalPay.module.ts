import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentalPayController } from "./rentalPay.controller";
import { UseKickboardHistoryRepository } from "./useKickboardHistory.repository";
import { RentalPayService } from "./rentalPay.service";
import { AreaPolicyRepository } from "./areaPolicy.repository";
import { AreaRepository } from "./area.repository";
import { ForbiddenAreaZoneRepository } from "./forbiddenAreaZone.repository";
import { ParkingZoneRepository } from "./parkingZone.repository";
import { DiscountModule } from "../discount/discount.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			UseKickboardHistoryRepository,
			AreaRepository,
			AreaPolicyRepository,
			ForbiddenAreaZoneRepository,
			ParkingZoneRepository,
			DiscountModule
		])
	],
	controllers: [RentalPayController],
	providers: [RentalPayService]
})
export class RentalPayModule {}
