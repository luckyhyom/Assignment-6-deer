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
		// 위도, 경도가 속한 area_id

		return await this.createQueryBuilder("a")
			.select(`ST_Distance(a.area_boundary,ST_PointFromText('POINT (${lat} ${lng})'))`)
			.innerJoin(DeerKickboards, "d", "a.area_id = d.area_id")
			.execute();
	}

}
