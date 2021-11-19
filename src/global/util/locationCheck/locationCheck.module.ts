import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeerKickboards } from "src/domain/entities/deerKickboards.entity";
import { ParkingZones } from "src/domain/entities/parkingZones.entity";
import { AreasRepository } from "./areasRepository";
import { LocationCheck } from "./locationCheck";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			AreasRepository,
			DeerKickboards,
			ParkingZones
		])
	],
	providers: [LocationCheck],
	exports: [LocationCheck]
})
export class LocationCheckModule {}
