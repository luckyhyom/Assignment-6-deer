import { EntityRepository, Repository } from "typeorm";
import { Discounts } from "../entities/discounts.entity";

@EntityRepository(Discounts)
export class DiscountRepository extends Repository<Discounts> {
	async getDiscount(discount_id) {
		return await this.findOne({ discount_id });
	}
}
//  저거 린트에요? 빨간줄? 해결 ㅎ ㅡㅎ
//  근데 지금 이 레파지토리에 필요한 entity 정보가 뭐죠?
// discounts 가 맞나유? 파킹존 아이디
// 사실 모르겟어요 ㅎ
