import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AreaRepository } from "../rentalPay/area.repository";
import { ForbiddenAreaZoneRepository } from "../rentalPay/forbiddenAreaZone.repository";
import { PenaltyRepository } from "./penalty.repository";
import { PenaltyService } from "./penalty.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			PenaltyRepository,
			AreaRepository,
			ForbiddenAreaZoneRepository
		])
	],
	exports: [PenaltyService],
	providers: [PenaltyService]
})
export class PenaltyModule {}
