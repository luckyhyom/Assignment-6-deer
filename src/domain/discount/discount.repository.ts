import { EntityRepository, Repository } from "typeorm";
import { Discounts } from "../entities/discounts.entity";

@EntityRepository(Discounts)
export class DiscountRepository extends Repository<Discounts> {
	async getDiscount(discount_id) {
		return await this.findOne({ discount_id });
	}
}
