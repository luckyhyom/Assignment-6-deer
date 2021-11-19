import { EntityRepository, Repository } from "typeorm";
import { AreaPolicies } from "../entities/areaPolicies.entity";

@EntityRepository(AreaPolicies)
export class AreaPolicyRepository extends Repository<AreaPolicies> {
	async findPolicy(area_id) {
		return await this.createQueryBuilder("area_policies")
			.select("base_payment, minute_payment")
			.where("area_id = :area_id", { area_id });
	}
}
