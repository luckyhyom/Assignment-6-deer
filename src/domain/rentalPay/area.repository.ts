import { EntityRepository, Repository } from "typeorm";
import { Areas } from "../entities/areas.entity";
import { DeerKickboards } from "../entities/deerKickboards.entity";

@EntityRepository(Areas)
export class AreaRepository extends Repository<Areas> {
	async returnAreaId(lat, lng) {
		// 위도, 경도가 속한 area_id
		return await this.createQueryBuilder("areas")
			.select("area_id")
			.where(
				"ST_Contains(area_boundary, ST_PointFromText('POINT (:lat :lng)'))",
				{ lat, lng }
			)
			.execute();
	}

	async returnDistance(lat, lng) {
		return await this.createQueryBuilder("a")
			.select(
				`ST_Distance(a.area_boundary,ST_PointFromText('POINT (${lat} ${lng})'))`
			)
			.innerJoin(DeerKickboards, "d", "a.area_id = d.area_id")
			.execute();
	}

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
}
