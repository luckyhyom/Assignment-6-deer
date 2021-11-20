// 벌금 적용 클래스

import { RentalPayReqDto } from "src/domain/rentalPay/dto/rentalPayReq.dto";
import { ForbiddenZonePenalty } from "./childClass/forbiddenZonePenalty";
import { OutAreaPenalty } from "./childClass/outAreaPenalty";
// import { penalty } from "./penalty";

export class PenaltyService {
	// CheckPenalty
	constructor(
		private readonly outAreaPenalty: OutAreaPenalty,
		private readonly forbiddenZonePenalty: ForbiddenZonePenalty
	) {}

	async checkPenalties(data: RentalPayReqDto) {
		data = this.outAreaPenalty.accept(data);
		data = this.forbiddenZonePenalty.accept(data);
		data = this.???.accept(data);
		return data;
	}
	// async checkPenalties(data: RentalPayReqDto) {
	// 	const accepted = [];
	// 	if (this.outAreaPenalty.IsYN(data)) {
	// 		accepted.push(penalty.OUT_OF_AREA);
	// 	}

	// 	if (this.forbiddenZonePenalty.IsYN(data)) {
	// 		accepted.push(penalty.FORBIDDEN);
	// 	}

	// 	return accepted;
	// }
}
