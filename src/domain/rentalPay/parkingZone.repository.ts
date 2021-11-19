import { EntityRepository, Repository } from "typeorm";
import { ParkingZones } from "../entities/parkingZones.entity";

@EntityRepository(ParkingZones)
export class ParkingZoneRepository extends Repository<ParkingZones> {
	async findParkingZone(lat, lng) {
		return await this.createQueryBuilder("pz")
			.where(
				"(ST_Distance_Sphere(POINT(pz.parkingzone_center_lat, pz.parkingzone_center_lng), ST_PointFromText('POINT(:lat :lng)')) - pz.parkingzone_radius) <= 0",
				{ lat, lng }
			)
			.execute();
	}
}
