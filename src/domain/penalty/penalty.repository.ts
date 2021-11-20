import { EntityRepository, Repository } from "typeorm";
import { Penalties } from "../entities/penalties.entity";

@EntityRepository(Penalties)
export class PenaltyRepository extends Repository<Penalties> {
	async getDiscount(penalty_id) {
		return await this.findOne({ penalty_id });
	}
}
