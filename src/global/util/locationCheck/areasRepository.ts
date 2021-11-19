import { Areas } from "src/domain/entities/areas.entity";
import { DeerKickboards } from "src/domain/entities/deerKickboards.entity";
import { ParkingZones } from "src/domain/entities/parkingZones.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Areas)
export class AreasRepository extends Repository<Areas> {
	async checkInArea(
		deer_id: number,
		use_end_lat: number,
		use_end_lng: number
	): Promise<boolean> {
		const queryResult = await this.createQueryBuilder("a")
			.select(
				"CASE WHEN MAX(a.area_id) IS NULL THEN false ELSE true END",
				"checkInArea"
			)
			.innerJoin(DeerKickboards, "d", "d.area_id = a.area_id")
			.where("d.deer_id = :deer_id", { deer_id: deer_id })
			.andWhere(
				"st_contains(a.area_boundary, GeomFromText('POINT(:use_end_lat :use_end_lng)'))",
				{
					use_end_lat: use_end_lat,
					use_end_lng: use_end_lng
				}
			)
			.getRawOne();

		return queryResult.checkInArea;
	}

	async checkInParkingZone(
		deer_id: number,
		use_end_lat: number,
		use_end_lng: number
	): Promise<boolean> {
		const queryResult = await this.createQueryBuilder("a")
			.select(
				"CASE WHEN MAX(a.area_id) IS NULL THEN false ELSE true END",
				"checkInParkingZone"
			)
			.innerJoin(DeerKickboards, "d", "d.area_id = a.area_id")
			.innerJoin(ParkingZones, "p", "a.area_id = p.area_id")
			.where("d.deer_id = :deer_id", { deer_id: deer_id })
			.andWhere(
				"st_contains(a.area_boundary, GeomFromText('POINT(:use_end_lat :use_end_lng)'))",
				{
					use_end_lat: use_end_lat,
					use_end_lng: use_end_lng
				}
			)
			.andWhere(
				"(ST_Distance_Sphere(POINT(p.parkingzone_center_lat, p.parkingzone_center_lng), ST_PointFromText('POINT(:use_end_lat :use_end_lng)')) - p.parkingzone_radius) <= 0",
				{
					use_end_lat: use_end_lat,
					use_end_lng: use_end_lng
				}
			)
			.getRawOne();
		return queryResult.checkInParkingZone;
	}
}
