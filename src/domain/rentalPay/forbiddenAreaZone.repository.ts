import { EntityRepository, Repository } from "typeorm";
import { ForbiddenAreaZones } from "../entities/forbiddenAreaZones.entity";

@EntityRepository(ForbiddenAreaZones)
export class ForbiddenAreaZoneRepository extends Repository<ForbiddenAreaZones> {
	async findForbiddenArea(lat, lng) {
		const queryResult = await this.createQueryBuilder("forbidden_area_zones")
		.select("forbidden_area_id")
		.where(
			"ST_Contains(forbidden_area_boundary, ST_PointFromText('POINT (:lat :lng)'))",
			{ lat, lng }
		)
		.getRawOne();
		return queryResult ? queryResult.forbidden_area_id : null;
	}
}
