import { RentalPayReqDto } from "src/domain/rentalPay/dto/rentalPayReq.dto";
import { ForbiddenAreaZoneRepository } from "src/domain/rentalPay/forbiddenAreaZone.repository";
import { Penalty } from "../penalty.interface";

export class ForbiddenZonePenalty implements Penalty {
	private penalty: number;
	constructor(
		private readonly forbiddenAreaZoneRepository: ForbiddenAreaZoneRepository
	) {
		this.penalty = 6000;
	}
	async accept(data: RentalPayReqDto) {
		const { deer_id, use_end_lat, use_end_lng, use_start_at, use_end_at } =
			data;

		const flag = await this.forbiddenAreaZoneRepository.findForbiddenArea(
			use_end_lat,
			use_end_lng
		);
		if (flag) data = this.calculate(data);
		return data;
	}

	async calculate(data) {
		data.pay += this.penalty;
		return data;
	}

	async IsYN(data: RentalPayReqDto): Promise<boolean> {
		const { deer_id, use_end_lat, use_end_lng, use_start_at, use_end_at } =
			data;

		return await this.forbiddenAreaZoneRepository.findForbiddenArea(
			use_end_lat,
			use_end_lng
		);
	}
}
