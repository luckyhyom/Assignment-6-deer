import { Penalties } from "src/domain/entities/penalties.entity";

export class PenaltyRes {
	name: string;
	code_id: number;
	amount: number;

	constructor(entity: Penalties) {
		this.name = entity.penalty_name;
		this.code_id = entity.code_id;
		this.amount = entity.penalty_pay;
	}
}
