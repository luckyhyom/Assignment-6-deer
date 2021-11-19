import { EntityRepository, Repository } from "typeorm";
import { AreaPolicies } from "../entities/areaPolicies.entity";
import { Areas } from "../entities/areas.entity";
import { DeerKickboards } from "../entities/deerKickboards.entity";

@EntityRepository(AreaPolicies)
export class AreaPolicyRepository extends Repository<AreaPolicies> {
	// async findPolicy(area_id) {
	// 	return await this.createQueryBuilder("area_policies")
	// 		.select("base_payment, minute_payment")
	// 		.where("area_id = :area_id", { area_id }); 
			
	// } // ? 이거는 뭔가여
/**
 * 
SELECT ap.base_payment, ap.minute_payment 
FROM area_policies ap, deer_kickboards d, areas a
WHERE d.area_id = 1
AND d.area_id = a.area_id
AND a.area_id = ap.area_id
 * @returns 
 */
	async findPolicy(deer_id: number) {
		return await this.createQueryBuilder("ap")
			.select("ap.base_payment")
			.addSelect("ap.minute_payment")
			.where("d.deer_id = :deer_id", { deer_id })
			.innerJoin(DeerKickboards, "d", "d.area_id = a.area_id")
			.innerJoin(Areas, "a", "a.area_id = ap.area_id")
			.execute();
	}


}
