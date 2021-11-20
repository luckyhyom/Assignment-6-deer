import { AreaRepository } from "src/domain/rentalPay/area.repository";
import { RentalPayReqDto } from "src/domain/rentalPay/dto/rentalPayReq.dto";
import { Penalty } from "../penalty.interface";

export class OutAreaPenalty implements Penalty {
	private penaltyPerDistance: number;
	constructor(private readonly areaRepository: AreaRepository) {
		this.payPerDistance = 600;
	}

	async accept(data: RentalPayReqDto) {
		const { deer_id, use_end_lat, use_end_lng, use_start_at, use_end_at } =
			data;
		const flag = await this.areaRepository.checkInArea(
			deer_id,
			use_end_lat,
			use_end_lng
		);
		if (flag) data = this.calculate(data);
		return data;
	}

	async calculate(data) {
		let dist = await this.areaRepository.returnDistance(
			data.use_end_lat,
			data.use_end_lng
		);
		dist *= 111 / 10; // 100m단위로 변경 1도 -> 111km
		data.pay += dist * this.payPerDistance;
		return data;
	}

	// async IsYN(data: RentalPayReqDto): Promise<boolean> {
	// 	const { deer_id, use_end_lat, use_end_lng, use_start_at, use_end_at } =
	// 		data;
	// 	return await this.areaRepository.checkInArea(
	// 		deer_id,
	// 		use_end_lat,
	// 		use_end_lng
	// 	);
	// }
}
