import { EntityRepository, Repository } from "typeorm";
import { Penalties } from "../entities/penalties.entity";

@EntityRepository(Penalties)
export class PenaltyRepository extends Repository<Penalties> {
	async getPenalty(penalty_id: number) {
		return await this.findOne({ penalty_id: penalty_id });
	}
}
