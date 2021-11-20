// 이것은 계산 클래스 이다

import { RentalPayReqDto } from "src/domain/rentalPay/dto/rentalPayReq.dto";
import { CheckPenalty } from "./penalty/checkPenalty";

export class Calculation {
	constructor(private readonly checkPenalty: CheckPenalty) {}
	async calculate(data: RentalPayReqDto) {
		const res = this.checkPenalty.checkPenalties(data);
	}
}
