import { EntityRepository, Repository } from "typeorm";
import { ForbiddenAreaZones } from "../entities/forbiddenAreaZones.entity";

@EntityRepository(ForbiddenAreaZones)
export class ForbiddenAreaZoneRepository extends Repository<ForbiddenAreaZones> {
	async findForbiddenArea(lat, lng) {
		const query = await this.createQueryBuilder("f")
			.select(
				"CASE WHEN MAX(f.area_id) IS NULL THEN false ELSE true END",
				"checkInForbidden"
			)
			.where(
				"st_contains(f.forbidden_area_boundary, ST_PointFromText('POINT (:lat :lng)'))",
				{ lat, lng }
			)
			.getRawOne();

		return query.checkInForbidden;
	}
}
