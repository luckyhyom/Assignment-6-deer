import { EntityRepository, Repository } from "typeorm";
import { AreaPolicies } from "../entities/areaPolicies.entity";
import { Areas } from "../entities/areas.entity";
import { DeerKickboards } from "../entities/deerKickboards.entity";

@EntityRepository(AreaPolicies)
export class AreaPolicyRepository extends Repository<AreaPolicies> {
	async findPolicy(deer_id) {
		return await this.createQueryBuilder("ap")
			.select("base_payment")
			.addSelect("minute_payment")
			.innerJoin(Areas, "a", "a.area_id = ap.area_id")
			.innerJoin(DeerKickboards, "d", "d.area_id = a.area_id")
			.where("d.deer_id = :deer_id", { deer_id })
			.execute();
	}
}
