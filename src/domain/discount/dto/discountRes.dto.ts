import { Discounts } from "src/domain/entities/discounts.entity";

export class DiscountResDto {
	name: string;
	code_id: number;
	discount_pay: number;

	constructor(entity: Discounts) {
		this.name = entity.discount_name;
		this.code_id = entity.code_id;
		this.discount_pay = entity.discount_pay;
	}
}
