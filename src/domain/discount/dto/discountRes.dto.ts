import { Discounts } from "src/domain/entities/discounts.entity";

export class DiscountResDto {
	name: string;
	code_id: number;
	amount: number;

	constructor(entity: Discounts) {
		this.name = entity.discount_name;
		this.code_id = entity.code_id;
		this.amount = entity.discount_pay;
	}
}
